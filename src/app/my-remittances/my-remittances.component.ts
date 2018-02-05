import { Component, OnInit, NgZone } from '@angular/core';
import { RemittanceService, Remittance } from '../remittance.service';

@Component({
  selector: 'app-my-remittances',
  templateUrl: './my-remittances.component.html',
  styleUrls: ['./my-remittances.component.css']
})
export class MyRemittancesComponent implements OnInit {
  remittances: Remittance[] = new Array<Remittance>()

  constructor(private zone: NgZone, private remittanceService: RemittanceService) { }

  ngOnInit() {
    this.remittanceService.remittances.subscribe(_remittances => this.zone.run(() => {
      console.log(_remittances);
      this.remittances = _remittances;
    }));
  }

  onRevokeClicked(otpHash) {
    console.log("onRevokeClicked: optHash:", otpHash);
    // FIXME call smartcontract
  }
}
