import { Block, BlockChain, Transaction, Wallet } from "../";

describe("Is Chain Valid", () => {
  it("should return true if the chain is valid", () => {
    const tysonCoin = new BlockChain();
    tysonCoin.difficulty = 1;

    tysonCoin.addBlock(new Block(1, []));
    tysonCoin.addBlock(new Block(2, []));

    expect(tysonCoin.isChainValid()).toBe(true);
  });

  it("should return false if the chain was tampered with", () => {
    const tysonCoin = new BlockChain();
    const myWallet = Wallet.create();
    const yourWallet = Wallet.create();
    tysonCoin.difficulty = 1;

    tysonCoin.addBlock(new Block(1, []));
    tysonCoin.addBlock(new Block(2, []));

    const tx1 = new Transaction(
      myWallet.getAddress(),
      yourWallet.getAddress(),
      100
    );

    tx1.signTransaction(myWallet.getPrivateKey());

    tysonCoin.chain[1].transactions = [tx1];

    expect(tysonCoin.isChainValid()).toBe(false);
  });
});
