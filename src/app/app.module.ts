import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NewRemittanceComponent } from './new-remittance/new-remittance.component';
import { MyRemittancesComponent } from './my-remittances/my-remittances.component';
import { NewClaimComponent } from './new-claim/new-claim.component';
import { MyClaimsComponent } from './my-claims/my-claims.component';


@NgModule({
  declarations: [
    AppComponent,
    NewRemittanceComponent,
    MyRemittancesComponent,
    NewClaimComponent,
    MyClaimsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
