import { product, productStore } from "../products";

const store = new productStore();
let ENV: string;
ENV = process.env.ENV as unknown as string;
describe("Product model", () => {
  beforeAll(async () => {
    await store.clearTables();
    await store.createTable();
  });
  it("ENV should = test", () => {
    expect(ENV).toEqual("test");
  });
  it("should have current Index", () => {
    expect(store.index).toBeDefined();
  });
  it("should have  Create", () => {
    expect(store.CreateProduct).toBeDefined();
  });
  it("should have Show Function", () => {
    expect(store.show).toBeDefined();
  });
  it("should return list of products", async () => {
    const reslt = await store.index();
    expect(reslt).toEqual([]);
  });
  it("should return a product", async () => {
    const product: product = { name: "", price: 0, category: "" };
    const reslt = await store.show(-1);
    expect(reslt).toEqual(product);
  });
  it("should return a product therefore product created", async () => {
    const product: product = { name: "test123", price: 0, category: "" };
    const reslt = await store.CreateProduct("test123", 0, "");
    expect(reslt).toEqual(product);
  });
  afterAll(async () => {
    await store.clearTables();
  });
});
