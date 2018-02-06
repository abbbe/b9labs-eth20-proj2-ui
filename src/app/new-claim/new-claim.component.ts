import { Component, OnInit, NgZone } from '@angular/core';
import { Remittance, RemittanceService } from '../remittance.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent implements OnInit {
  otpSecret_claim: string;
  busy: any;
  claimTxState: string;

  constructor(private zone: NgZone, private web3Service: Web3Service, private remittanceService: RemittanceService) { }

  ngOnInit() {
  }

  onNewClaimClick(): void {
    let otpValue = Remittance.secretToOtp(this.otpSecret_claim);

    var txHash;
    this.busy = this.remittanceService.claim(otpValue)
      .then(_txHash => this.zone.run(() => {
        txHash = _txHash;
        this.claimTxState = "Claim tx " + txHash + " is pending";

        // leave "background" promise
        this.web3Service.getTransactionReceiptMined(txHash)
          .then(receipt => this.zone.run(() => {
            this.claimTxState = "Claim tx " + txHash + " is mined, status: " + receipt.status;
          }));
      }))
      .catch(err => alert(err));
  }
}
