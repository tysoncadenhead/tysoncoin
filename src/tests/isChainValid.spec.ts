import { Block, BlockChain } from "../";

describe("Is Chain Valid", () => {
  it("should return true if the chain is valid", () => {
    const tysonCoin = new BlockChain();
    tysonCoin.difficulty = 1;

    tysonCoin.addBlock(new Block(1, { amount: 4 }));
    tysonCoin.addBlock(new Block(2, { amount: 10 }));

    expect(tysonCoin.isChainValid()).toBe(true);
  });

  it("should return false if the chain was tampered with", () => {
    const tysonCoin = new BlockChain();
    tysonCoin.difficulty = 1;

    tysonCoin.addBlock(new Block(1, { amount: 4 }));
    tysonCoin.addBlock(new Block(2, { amount: 10 }));

    tysonCoin.chain[1].data = { amount: 100 };

    expect(tysonCoin.isChainValid()).toBe(false);
  });
});
