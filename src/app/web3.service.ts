import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};

// const Promise = require("bluebird");
// Promise.promisifyAll(window.web3.eth, { suffix: "Promise" });
// Promise.promisifyAll(window.web3.version, { suffix: "Promise" });

@Injectable()
export class Web3Service {
  web3: any;

  networkId: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  lastBlock: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  accountAddress: BehaviorSubject<string> = new BehaviorSubject<string>("?");
  accountBalance: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor() {
    this.web3 = window.web3;

    // get network ID
    window.web3.version.getNetwork((err, _networkId) => {
      if (err) {
        this.networkId.next(-1);
        return;
      }

      //console.log("Network ID:", _networkId)
      this.networkId.next(_networkId);
    });

    // get account address and balance
    window.web3.eth.getAccounts((err, _accounts) => {
      if (err) {
        this.accountAddress.next("#ERROR");
        this.accountBalance.next(-1);
        return;
      }
      // console.log("Accounts:", _accounts)
      if (_accounts.length == 0) {
        this.accountAddress.next("#NOACCOUNTS");
        this.accountBalance.next(-1);
      } else {
        this.accountAddress.next(_accounts[0]);

        // get balance
        window.web3.eth.getBalance(_accounts[0], (err, _balance) => {
          if (err) {
            this.accountBalance.next(-1);
            return;
          }
          // console.log("Balance:", _balance)        
          this.accountBalance.next(window.web3.fromWei(_balance, 'ether'));
        });
      }
    });

    // watch blocks and update last_block number
    window.web3.eth.filter("latest", (err, blockHash) => {
      if (err) {
        // console.log("filter error", err);
        this.lastBlock.next(-1);
      } else {
        // console.log("Block hash:", blockHash);
        window.web3.eth.getBlock(blockHash, (error, block) => {
          if (err) {
            // console.log("getBlock() error:", err);
            this.lastBlock.next(-1);
          } else {
            // console.log("Block number:", block.number);
            this.lastBlock.next(block.number);
          }
        });
      }
    });
  }

  getWeb3() {
    return this.web3;
  }
}
