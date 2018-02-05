import { Component, OnInit } from '@angular/core';
import { RemittanceService } from '../remittance.service';
import { Subject } from 'rxjs/Subject';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-eth-dashboard',
  templateUrl: './eth-dashboard.component.html',
  styleUrls: ['./eth-dashboard.component.css']
})
export class EthDashboardComponent implements OnInit {
  networkId: number;
  lastBlock: number;
  accountAddress: string;
  accountBalance: number;
  contractAddress: string;
  contractOwnerAddress: string;

  constructor(private web3Service: Web3Service, private remittanceService: RemittanceService) { }

  ngOnInit() {
    this.web3Service.networkId.subscribe(_networkId =>
      this.networkId = _networkId);

    this.web3Service.accountAddress.subscribe(_accountAddress =>
      this.accountAddress = _accountAddress
    );

    this.web3Service.accountBalance.subscribe(_accountBalance =>
      this.accountBalance = _accountBalance
    );

    this.remittanceService.contractInfo.subscribe(_contractInfo => {
      this.contractAddress = _contractInfo.address;
      this.contractOwnerAddress = _contractInfo.address;
    });
  }
}