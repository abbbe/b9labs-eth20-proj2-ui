import { Component, OnInit, NgZone } from '@angular/core';

declare var System: any;

@Component({
  selector: 'app-eth-dashboard',
  templateUrl: './eth-dashboard.component.html',
  styleUrls: ['./eth-dashboard.component.css']
})
export class EthDashboardComponent implements OnInit {
  networkId: number;
  lastBlock: number;
  contractAddress: string;
  contractOwnerAddress: string;
  accountAddress: string;
  accountBalance: number;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // get network ID
    window.web3.version.getNetwork((err, _networkId) => this.ngZone.run(() => {
      if (err) {
        this.networkId = -1;
        return;
      }

      // console.log("Network ID:", _networkId)
      this.networkId = _networkId;
    }));

    // get account address and balance
    window.web3.eth.getAccounts((err, _accounts) => this.ngZone.run(() => {
      if (err) {
        this.accountAddress = "#ERROR";
        this.accountBalance = -1;
        return;
      }
      // console.log("Accounts:", _accounts)
      this.accountAddress = _accounts[0];

      // get balance
      window.web3.eth.getBalance(this.accountAddress, (err, _balance) => this.ngZone.run(() => {
        if (err) {
          this.accountBalance = -1;
          return;
        }
        // console.log("Balance:", _balance)        
        this.accountBalance = window.web3.fromWei(_balance, 'ether');
      }));
    }));

    // watch blocks and update last_block number
    window.web3.eth.filter("latest", (err, blockHash) => this.ngZone.run(() => {
      // console.log("Block hash:", blockHash);
      if (err) {
        this.lastBlock = -1;
      } else {
        window.web3.eth.getBlock(blockHash, (error, block) => this.ngZone.run(() => {
          // console.log("Block number:", block.number);
          if (err) {
            this.lastBlock = -1;
          } else {
            this.lastBlock = block.number;
          }
        }));
      }
    }));

    // get deployed contract
    System.import('../../../../b9labs-eth20-proj2/build/contracts/Remittance.json').then(remittanceArtifacts => {
      // console.log(remittanceArtifacts);
      System.import('truffle-contract').then(truffleContract => this.ngZone.run(() => {
        const Remittance = truffleContract(remittanceArtifacts);
        Remittance.setProvider(window.web3.currentProvider);
        Remittance.deployed().then(_instance => {
          var remittance = _instance;
          // console.log("Contract address:", remittance.contract.address);
          this.contractAddress = _instance.contract.address;
          return remittance.owner().then(_owner => this.contractOwnerAddress = _owner);
        }).catch(err => {
          console.log("Cannot find a deployed contract:", err);
          this.contractAddress = "#ERROR";
          this.contractOwnerAddress = "#ERROR";
        });
      })).catch(err => console.log(err)); // something went wrong while loading truffle-contract
    }).catch(err => console.log(err)); // something went wrong while loading JSON
  }
}