import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Web3Service } from './web3.service';

declare var System: any;

export class Remittance {
  public created: number;
  public revoked: number;
  public claimed: number;

  public isRevokable() { return !this.revoked && !this.claimed; }
  public isClaimable() { return !this.revoked && !this.claimed; }

  constructor(
    public sender: string,
    public recipient: string,
    public amount: any, // BigNumber
    public otpHash: string) { }

  public getAmountEth() {
    return window.web3.fromWei(this.amount, 'ether');
  }

  public static secretToOtp(secret_hex, _recipient) {
    return window.web3.sha3(secret_hex, { encoding: 'hex' });
  }

  public static secretToOtpHash(secret_hex, recipient) {
    var otpValue = this.secretToOtp(secret_hex, recipient);
    return window.web3.sha3(otpValue + recipient.replace("0x", ""), { encoding: 'hex' });
  }
}

@Injectable()
export class RemittanceService {
  public contractInfo: BehaviorSubject<any> = new BehaviorSubject<any>({ address: "?", ownerAddress: "?" });
  public remittances: BehaviorSubject<Array<Remittance>> = new BehaviorSubject<Array<Remittance>>([]);

  public account;
  private instance;
  private remittanceList: Array<Remittance> = new Array<Remittance>();

  private useContract(remittanceTruffleContract) {
    remittanceTruffleContract.setProvider(window.web3.currentProvider);
    remittanceTruffleContract.deployed().then(_instance => {
      // console.log("Truffle contract instance:", _instance);
      this.instance = _instance;

      this.startWatching();

      // get address of smartcontract owner
      return this.instance.owner().then(_owner => {
        // console.log("Contract owner address:", _owner);
        this.contractInfo.next({
          address: this.instance.contract.address,
          ownerAddress: _owner
        });
      });
    }).catch(err => {
      // console.log("Cannot find a deployed contract:", err);
      this.contractInfo.next({
        address: "#ERROR",
        ownerAddress: "#ERROR"
      });
    });
  }

  private startWatching() {
    this.web3Service.accountAddress.subscribe(acc => {
      this.startWatchingMyRemittances({ sender: acc });
      this.startWatchingMyRemittances({ recipient: acc });
      // TODO: watch for LogKill
    });
  }

  private startWatchingMyRemittances(filter) {
    this.instance.LogRemittance(filter, { fromBlock: 0 })
      .watch((err, event) => {
        if (err) {
          console.log("Error watching for LogRemittance");
          return;
        }
        this.handleEvent(event);
      });
    this.instance.LogRevoke(filter, { fromBlock: 0 })
      .watch((err, event) => {
        if (err) {
          console.log("Error watching for LogRevoke");
          return;
        }
        this.handleEvent(event);
      });
    this.instance.LogClaim(filter, { fromBlock: 0 })
      .watch((err, event) => {
        if (err) {
          console.log("Error watching for LogClaim");
          return;
        }
        this.handleEvent(event);
      });
  }

  private handleEvent(event) {
    let newR = false;
    let r = this.remittanceList.find(_r => (_r.otpHash == event.args.otpHash));
    if (!r) {
      r = new Remittance(event.args.sender, event.args.recipient, event.args.amount, event.args.otpHash);
      newR = true;
    }

    if (event.event == "LogRemittance") {
      if (r.created && r.created != event.blockNumber) {
        console.error('Duplicate LogRemittance otpHash', event.args.otpHash);
        return;
      }
      r.created = event.blockNumber;
    } else if (event.event == "LogRevoke") {
      if (r.revoked && r.revoked != event.blockNumber) {
        console.error('Duplicate LogRevoke otpHash', event.args.otpHash);
        return;
      }
      r.revoked = event.blockNumber;
    } else if (event.event == "LogClaim") {
      if (r.claimed && r.claimed != event.blockNumber) {
        console.error('Duplicate LogClaim otpHash', event.args.otpHash);
        return;
      }
      r.claimed = event.blockNumber;
    } else {
      console.error("Unexpected event:", event);
      return;
    }

    // add new record
    if (newR) {
      this.remittanceList.push(r);
    }

    // sort by creation block number
    this.remittanceList = this.remittanceList.sort((r1, r2) => {
      // uncreated will drift on top
      if (r1.created && !r2.created) {
        return -1;
      }
      if (!r1.created && r2.created) {
        return 1;
      }

      // created are ordered by block
      if (r1.created > r2.created) {
        return -1;
      }
      if (r1.created < r2.created) {
        return 1;
      }

      // two uncreated or within the same block block - ordered by otpHash
      if (r1.otpHash > r2.otpHash) {
        return -1;
      }
      if (r1.otpHash < r2.otpHash) {
        return 1;
      }
      console.error("Dupliated entries, otpHash:", r1.otpHash)
    });

    this.remittances.next(this.remittanceList); // throttle?
  }

  constructor(private web3Service: Web3Service) {
    // get deployed contract
    System.import('../../../b9labs-eth20-proj2/build/contracts/Remittance.json')
      .then(remittanceArtifacts => {
        // console.log(remittanceArtifacts);
        System.import('truffle-contract').then(truffleContract => {
          // console.log('truffleContract:', truffleContract)
          const remittanceTruffleContract = truffleContract(remittanceArtifacts);
          this.useContract(remittanceTruffleContract);
        }).catch(err => console.log(err)); // something went wrong while loading truffle-contract
      }).catch(err => console.log(err)); // something went wrong while loading JSON

    this.web3Service.accountAddress.subscribe(_acc => this.account = _acc);
  }

  public remit(r: Remittance) {
    let amount = window.web3.toWei(r.amount, 'ether');
    return this.instance.remit.sendTransaction(r.otpHash, r.recipient,
      { from: r.sender, value: amount });
  }

  public revoke(otpHash: string) {
    return this.instance.revoke.sendTransaction(otpHash, { from: this.account });
  }
}