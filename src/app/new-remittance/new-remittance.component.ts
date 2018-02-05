import { Component, OnInit, NgZone } from '@angular/core';
import { Web3Service } from '../web3.service';
import { RemittanceService, Remittance } from '../remittance.service';

@Component({
  selector: 'app-new-remittance',
  templateUrl: './new-remittance.component.html',
  styleUrls: ['./new-remittance.component.css']
})
export class NewRemittanceComponent implements OnInit {
  sender: string;
  recipient: string;
  amount: number;
  otpSecret: string;
  busy: any;
  remitTxState: string;

  constructor(private zone: NgZone, private web3Service: Web3Service, private remittanceService: RemittanceService) { }

  ngOnInit() {
    this.web3Service.accountAddress.subscribe(_acc => this.sender = _acc);
  }

  onNewRemittanceClick(): void {
    // console.log('onNewRemittanceClick(): recipient=', this.recipient, 'amount=', this.amount, 'otpSecret=', this.otpSecret);
    // FIXME validate user input

    let otpHash = Remittance.secretToOtpHash(this.otpSecret, this.recipient);
    let r = new Remittance(this.sender, this.recipient, this.amount, otpHash);

    var txHash;
    this.busy = this.remittanceService.remit(r)
      .then(_txHash => this.zone.run(() => {
        txHash = _txHash;
        this.remitTxState = "Transaction " + txHash + " pending";

        // leave "background" promise
        this.web3Service.getTransactionReceiptMined(txHash)
          .then(receipt => this.zone.run(() => {
            this.remitTxState = "Transaction " + txHash + " mined, status: " + receipt.status;
          }));
      }))
      .catch(err => alert(err));
  }
}