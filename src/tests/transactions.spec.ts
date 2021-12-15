import { BlockChain, Transaction, Wallet } from "../";

describe("Transactions", () => {
  it("Should accept transactions", () => {
    const miningWallet = new Wallet();
    const myWallet = new Wallet();
    const yourWallet = new Wallet();
    const myAddress = myWallet.getWalletAddress();
    const yourAddress = yourWallet.getWalletAddress();
    const miningAddress = miningWallet.getWalletAddress();

    const tysonCoin = new BlockChain();

    const tx1 = new Transaction(yourAddress, myAddress, 100);
    tx1.signTransaction(yourWallet.getPrivateKey());

    tysonCoin.addTransaction(tx1);

    tysonCoin.minePendingTransactions(miningAddress);

    const tx2 = new Transaction(myAddress, yourAddress, 50);
    tx2.signTransaction(myWallet.getPrivateKey());

    tysonCoin.addTransaction(tx2);

    tysonCoin.minePendingTransactions(miningAddress);

    expect(tysonCoin.getBalanceOfAddress(myAddress)).toBe(50);
    expect(tysonCoin.getBalanceOfAddress(yourAddress)).toBe(-50);
    expect(tysonCoin.getBalanceOfAddress(miningAddress)).toBe(100);
  });
});
