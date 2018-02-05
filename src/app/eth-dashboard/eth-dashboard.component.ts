import { Component, OnInit, NgZone } from '@angular/core';
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

  constructor(private zone: NgZone, private web3Service: Web3Service, private remittanceService: RemittanceService) { }

  ngOnInit() {
    this.web3Service.networkId.subscribe(_networkId => this.zone.run(() => 
      this.networkId = _networkId));

    this.web3Service.accountAddress.subscribe(_accountAddress => this.zone.run(() => 
      this.accountAddress = _accountAddress
    ));

    this.web3Service.accountBalance.subscribe(_accountBalance => this.zone.run(() => 
      this.accountBalance = _accountBalance
    ));

    this.web3Service.lastBlock.subscribe(_lastBlock => this.zone.run(() => {
      console.log(_lastBlock);
      this.lastBlock = _lastBlock;
    }));

    this.remittanceService.contractInfo.subscribe(_contractInfo => this.zone.run(() => {
      this.contractAddress = _contractInfo.address;
      this.contractOwnerAddress = _contractInfo.address;
    }));
  }
}