import { Order, ordr, orderStore } from "../order";

const store = new orderStore();
let ENV: string;
ENV = process.env.ENV as unknown as string;
describe("order model", () => {
  beforeAll(async () => {
    await store.clearTables();
    await store.createTable();
  });
  it("ENV should = test", () => {
    expect(ENV).toEqual("test");
  });
  it("should have current order by user", () => {
    expect(store.getActiveOrderByUser).toBeDefined();
  });
  it("should return a list", async () => {
    const reslt = await store.getActiveOrderByUser(1);
    expect(reslt).toEqual([]);
  });
});
