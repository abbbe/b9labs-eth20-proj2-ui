import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var System: any;

export class Remittance {
  constructor(
    public sender: string,
    public recipient: string,
    public amount: number,
    public otpHash: string) { }
}

@Injectable()
export class RemittanceService {
  public contractInfo: Subject<any> = new Subject<any>();
  public remittances: BehaviorSubject<Array<Remittance>> = new BehaviorSubject<Array<Remittance>>([]);

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
        address: "#RROR",
        ownerAddress: "#RROR"
      });
    });
  }

  private startWatching() {
    // FIXME pupulate from events
    this.remittanceList.push(new Remittance('x-sender', 'x-recipient', 1, 'x-otphash'));
    this.remittances.next(this.remittanceList); // throttle?
  }

  constructor() {
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
  }
}