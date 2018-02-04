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
  }
}
