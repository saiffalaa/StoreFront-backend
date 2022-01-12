import supertest from "supertest";
import { productStore } from "../products";
import { userStore } from "../user";
import jwt from "jsonwebtoken";
import { orderStore } from "./../order";
import app from "../..";
import { assert } from "console";
const reqst = supertest(app);
const pStore = new productStore();
const uStore = new userStore();
const oStore = new orderStore();

describe("Users Endpoint", () => {
  let baseURL: string;
  let token: string;
  beforeAll(async () => {
    await uStore.createTable();
    await uStore.clearTables();

    baseURL = "http://localhost:3000/users";
    token = jwt.sign(
      { user: { firstName: "saif", lastName: "alaa", password: "123" } },
      process.env.TOKEN_SECRET as unknown as string
    );
  });

  it("index returns status code = 200", async () => {
    const resp = await reqst.get("/users").set({ authorization: token });

    assert(resp.status === 200, "Success");
  });
  it("show returns status code = 200", async () => {
    const resp = await reqst.get("/users/1").set({ authorization: token });
    expect(resp.status).toBe(200);
  });
  it("Create returns status code = 200", async () => {
    const resp = await reqst
      .post("/users/signup")
      .send({ firstName: "saif", lastName: "alaa", password: "123" });
    expect(resp.status).toBe(200);
  });
  afterAll(async () => {
    uStore.clearTables();
  });
});
describe("Orders Endpoint", () => {
  let token: string;
  beforeAll(async () => {
    await oStore.createTable();
    await oStore.clearTables();
    token = jwt.sign(
      { user: { firstName: "saif", lastName: "alaa", password: "123" } },
      process.env.TOKEN_SECRET as unknown as string
    );
  });
  it("index returns status code = 200", async () => {
    const resp = await reqst
      .get("/orders/active/user/1")
      .set({ authorization: token });
    expect(resp.status).toBe(200);
  });
});
describe("Product Endpoint", () => {
  let token: string;
  beforeAll(async () => {
    await pStore.createTable();
    await pStore.createTable();
    token = jwt.sign(
      { user: { firstName: "saif", lastName: "alaa", password: "123" } },
      process.env.TOKEN_SECRET as unknown as string
    );
  });
  it("index returns status code = 200", async () => {
    const resp = await reqst.get("/product");
    expect(resp.status).toBe(200);
  });
  it("show returns status code = 200", async () => {
    const resp = await reqst.get("/product/1");
    expect(resp.status).toBe(200);
  });
  it("Create returns status code = 200", async () => {
    const resp = await reqst
      .post("/product")
      .send({ name: "saif", price: "123", category: "cloth" })
      .set({ authorization: token });
    expect(resp.status).toBe(200);
    // expect(resp.statusCode).toBe(200);
  });
  afterAll(async () => {
    await pStore.clearTables();
  });
});

// json: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RuYW1lIjoiQWxhYSBlbCBkaW4iLCJwYXNzd29yZCI6IiQyYiQxMCR1TjRzRTMwNG1rQWxCdUtxUzJFWU1PeWNiNzRZR0ZjS3JhUXRZcW1QaGdmZndMclVCMEtYSyIsImxhc3RuYW1lIjoic2FpZiJ9LCJpYXQiOjE2NDE3OTQwMzV9.0Jkab_kGAq10hKmL3grxdifjW48XWlH1eWGIftPFO_Q",
//   },
