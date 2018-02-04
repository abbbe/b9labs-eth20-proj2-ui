import { Component, OnInit } from '@angular/core';
import { Remittance } from '../remittance';

@Component({
  selector: 'app-new-remittance',
  templateUrl: './new-remittance.component.html',
  styleUrls: ['./new-remittance.component.css']
})
export class NewRemittanceComponent implements OnInit {
  recipient: string;
  amount: number;
  otp_secret: string;

  constructor() { }

  ngOnInit() {
  }

  onNewRemittanceClick(): void {
    console.log('onNewRemittanceClick() runs, remittance:',
      this.recipient, this.amount, this.otp_secret);
    // FIXME: call contract here
  }
}
