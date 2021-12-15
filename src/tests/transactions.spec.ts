import { Block, BlockChain, Transaction } from "../";

describe("Transactions", () => {
  it("Should accept transactions", () => {
    const tysonCoin = new BlockChain();

    tysonCoin.createTransaction(
      new Transaction("your-address", "my-address", 100)
    );

    tysonCoin.minePendingTransactions("mining-address");

    tysonCoin.createTransaction(
      new Transaction("my-address", "your-address", 50)
    );

    tysonCoin.minePendingTransactions("mining-address");

    expect(tysonCoin.getBalanceOfAddress("my-address")).toBe(50);
    expect(tysonCoin.getBalanceOfAddress("your-address")).toBe(-50);
    expect(tysonCoin.getBalanceOfAddress("mining-address")).toBe(100);
  });
});
