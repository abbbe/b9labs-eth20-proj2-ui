import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var System: any;

@Injectable()
export class RemittanceService {
  public contractInfo: Subject<any> = new Subject<any>();
  private remittance;

  private useContract(remittanceTruffleContract) {
    remittanceTruffleContract.setProvider(window.web3.currentProvider);
    remittanceTruffleContract.deployed().then(_instance => {
      this.remittance = _instance;
      // console.log("Contract address:", this.remittance.contract.address);
      return this.remittance.owner().then(_owner => {
        // console.log("Contract owner address:", _owner);
        this.contractInfo.next({
          address: this.remittance.contract.address,
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