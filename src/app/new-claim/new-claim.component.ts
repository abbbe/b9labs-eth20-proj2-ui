import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent implements OnInit {
  otpSecret: string;

  constructor() { }

  ngOnInit() {
  }

  onNewClaimClick(): void {
    console.log('onNewClaimClick() runs, claim:', this.otpSecret);
    // FIXME: call contract here
  }
}
