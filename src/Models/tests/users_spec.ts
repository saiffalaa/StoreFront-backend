import { User, userStore } from "../user";

const store = new userStore();
let ENV: string;
ENV = process.env.ENV as unknown as string;
describe("User model", () => {
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
    expect(store.create).toBeDefined();
  });
  it("should have Show Function", () => {
    expect(store.show).toBeDefined();
  });
  it("should return list of users", async () => {
    const reslt = await store.index();
    expect(reslt).toEqual([]);
  });
  it("should return a user", async () => {
    const usr: User = { firstName: "", lastName: "", password: "" };
    const reslt = await store.show(-1);
    expect(reslt).toEqual(usr);
  });
  it("should return a user therefore user Created", async () => {
    const usr: User = { firstName: "test123", lastName: "", password: "" };
    const reslt = await store.create(usr);
    expect(reslt).toEqual(usr);
  });
  afterAll(async () => {
    await store.clearTables();
  });
});
