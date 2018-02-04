import { Component, OnInit } from '@angular/core';
import { Remittance } from '../remittance';

@Component({
  selector: 'app-my-remittances',
  templateUrl: './my-remittances.component.html',
  styleUrls: ['./my-remittances.component.css']
})
export class MyRemittancesComponent implements OnInit {
  remittances: Remittance[] = new Array<Remittance>()

  constructor() { }

  ngOnInit() {
    // FIXME pupulate from events
    this.remittances.push(new Remittance('x-sender', 'x-recipient', 1, 'x-otphash'));
  }

  onRevokeClicked(otpHash) {
    console.log("onRevokeClicked: optHash:", otpHash);
    // FIXME call smartcontract
  }
}
