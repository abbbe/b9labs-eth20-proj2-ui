export class Claim {
    constructor(
        public sender: string,
        public recipient: string,
        public amount: number,
        public otpHash: string) { }
}