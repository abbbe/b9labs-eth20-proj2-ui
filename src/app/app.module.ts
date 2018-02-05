import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

import { AppComponent } from './app.component';
import { NewRemittanceComponent } from './new-remittance/new-remittance.component';
import { MyRemittancesComponent } from './my-remittances/my-remittances.component';
import { NewClaimComponent } from './new-claim/new-claim.component';
import { MyClaimsComponent } from './my-claims/my-claims.component';
import { EthDashboardComponent } from './eth-dashboard/eth-dashboard.component';
import { RemittanceService } from './remittance.service';
import { Web3Service } from './web3.service';


@NgModule({
  declarations: [
    AppComponent,
    NewRemittanceComponent,
    MyRemittancesComponent,
    NewClaimComponent,
    MyClaimsComponent,
    EthDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule
  ],
  providers: [Web3Service, RemittanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
