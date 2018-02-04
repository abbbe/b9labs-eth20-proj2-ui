import { Injectable } from '@angular/core';

declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};

// const Promise = require("bluebird");
// Promise.promisifyAll(window.web3.eth, { suffix: "Promise" });
// Promise.promisifyAll(window.web3.version, { suffix: "Promise" });

@Injectable()
export class Web3Service {
  web3: any;

  constructor() {
    this.web3 = window.web3;
  }

  getWeb3() {
    return this.web3;
  }
}
