import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// from https://ethereum.stackexchange.com/questions/19074/how-to-hook-up-web3-injected-by-metamask-in-angular-2
//import Web3 from 'web3';

if (environment.production) {
  enableProdMode();
}

// window.addEventListener('load', function () {
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof window.web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     window.web3 = new Web3(window.web3.currentProvider);
//   } else {
//     console.log('No web3? You should consider trying MetaMask!')
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
//});