import Elliptic from "elliptic";

export const ec = new Elliptic.ec("secp256k1");

export class Wallet {
  publicKey: string;
  privateKey?: string;

  constructor(publicKey: string, privateKey?: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  getAddress() {
    return this.publicKey;
  }

  getPrivateKey() {
    if (!this.privateKey) {
      throw new Error("This is not your wallet!");
    }

    return ec.keyFromPrivate(this.privateKey);
  }

  authenticate(privateKey: string) {
    this.privateKey = privateKey;
  }

  public static create() {
    const key = ec.genKeyPair();
    const wallet = new Wallet(key.getPublic("hex"), key.getPrivate("hex"));

    return wallet;
  }
}
