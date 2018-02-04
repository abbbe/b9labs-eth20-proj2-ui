import { Component, OnInit, NgZone } from '@angular/core';
import { Web3Service } from '../web3.service';

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
  otherAccounts: string[]

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    var self = this;
    window.web3.version.getNetwork((err, _networkId) => this.ngZone.run(() => {
      console.log("Network ID:", _networkId)
      this.networkId = _networkId;
    }));

    // watch blocks and update last_block number
    window.web3.eth.filter("latest", (err, blockHash) => this.ngZone.run(() => {
      console.log("Block hash:", blockHash);
      if (err) {
        this.lastBlock = -1;
      } else {
        window.web3.eth.getBlock(blockHash, (error, block) => this.ngZone.run(() => {
          console.log("Block number:", block.number);
          if (err) {
            this.lastBlock = -1;
          } else {
            this.lastBlock = block.number;
          }
        }));
      }
    }));
  }
}
