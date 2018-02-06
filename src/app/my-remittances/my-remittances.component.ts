import { Component, OnInit, NgZone } from '@angular/core';
import { RemittanceService, Remittance } from '../remittance.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-my-remittances',
  templateUrl: './my-remittances.component.html',
  styleUrls: ['./my-remittances.component.css']
})
export class MyRemittancesComponent implements OnInit {
  remittances: Remittance[] = new Array<Remittance>()
  busy: any;
  revokeTxState: string;

  constructor(private zone: NgZone, private web3Service: Web3Service, private remittanceService: RemittanceService) { }

  ngOnInit() {
    this.remittanceService.remittances.subscribe(_remittances => this.zone.run(() => {
      this.remittances = _remittances;
    }));
  }

  onRevokeClicked(otpHash) {
    // console.log("onRevokeClicked: optHash:", otpHash);
    
    var txHash;
    this.busy = this.remittanceService.revoke(otpHash)
      .then(_txHash => this.zone.run(() => {
        txHash = _txHash;
        this.revokeTxState = "Revoke tx " + txHash + " is pending";

        // leave "background" promise
        this.web3Service.getTransactionReceiptMined(txHash)
          .then(receipt => this.zone.run(() => {
            this.revokeTxState = "Revoke tx " + txHash + " is mined, status: " + receipt.status;
          }));
      }))
      .catch(err => alert(err));
  }
}
