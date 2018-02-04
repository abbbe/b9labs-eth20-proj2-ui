import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eth-dashboard',
  templateUrl: './eth-dashboard.component.html',
  styleUrls: ['./eth-dashboard.component.css']
})
export class EthDashboardComponent implements OnInit {
  networkId: string
  lastBlock: number
  contractAddress: string
  ownerAddress: string
  accountAddress: string
  accountBalance: number
  otherAccounts: string[]

  constructor() { }

  ngOnInit() {
    // FIXME link to network events
  }
}
