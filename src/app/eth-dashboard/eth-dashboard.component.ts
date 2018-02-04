import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-eth-dashboard',
  templateUrl: './eth-dashboard.component.html',
  styleUrls: ['./eth-dashboard.component.css']
})
export class EthDashboardComponent implements OnInit {
  networkId: string = "N/A"
  lastBlock: number
  contractAddress: string
  ownerAddress: string
  accountAddress: string
  accountBalance: number

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // get network ID
    window.web3.version.getNetwork((err, _networkId) => this.ngZone.run(() => {
      // console.log("Network ID:", _networkId)
      this.networkId = _networkId;
    }));

    // get account info
    window.web3.eth.getAccounts((err, _accounts) => this.ngZone.run(() => {
      // console.log("Accounts:", _accounts)
      this.accountAddress = _accounts[0];

      // get balance
      window.web3.eth.getBalance(this.accountAddress, (err, _balance) => this.ngZone.run(() => {
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

    const truffleContract = require('truffle-contract');
    const remittanceArtifacts = require('../../../../b9labs-eth20-proj2/build/contracts/Remittance.json');
    const Remittance = truffleContract(remittanceArtifacts);
    Remittance.setProvider(window.web3.currentProvider);
  }
}