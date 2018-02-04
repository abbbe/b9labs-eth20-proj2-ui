import { Component, OnInit } from '@angular/core';
import { Claim } from '../claim';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent implements OnInit {
  claims: Claim[] = new Array<Claim>();

  constructor() { }

  ngOnInit() {
    this.claims.push(new Claim('x-sender', 'x-recipient', 1, 'x-otphash'));
  }

  onClaimClicked(otpHash) {
    console.log("onClaimClicked: optHash:", otpHash);
    // FIXME call smartcontract
  }
}
