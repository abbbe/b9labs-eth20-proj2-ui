import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

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

  networkId: Subject<number> = new Subject<number>();
  accountAddress: Subject<string> = new Subject<string>();
  accountBalance: Subject<number> = new Subject<number>();

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

    // // watch blocks and update last_block number
    // window.web3.eth.filter("latest", (err, blockHash) => this.ngZone.run(() => {
    //   // console.log("Block hash:", blockHash);
    //   if (err) {
    //     this.lastBlock = -1;
    //   } else {
    //     window.web3.eth.getBlock(blockHash, (error, block) => this.ngZone.run(() => {
    //       // console.log("Block number:", block.number);
    //       if (err) {
    //         this.lastBlock = -1;
    //       } else {
    //         this.lastBlock = block.number;
    //       }
    //     }));
    //   }
    // }));    
  }

  getWeb3() {
    return this.web3;
  }
}
