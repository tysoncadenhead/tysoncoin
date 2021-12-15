import Elliptic from "elliptic";

export const ec = new Elliptic.ec("secp256k1");

export class Wallet {
  publicKey: string;
  privateKey: string;

  constructor(publicKey?: string, privateKey?: string) {
    if (publicKey && privateKey) {
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    } else {
      const key = ec.genKeyPair();
      this.publicKey = key.getPublic("hex");
      this.privateKey = key.getPrivate("hex");
    }
  }

  getWalletAddress() {
    return this.publicKey;
  }

  getPrivateKey() {
    return ec.keyFromPrivate(this.privateKey);
  }
}
