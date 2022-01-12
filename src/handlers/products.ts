import { product, productStore } from "../Models/products";
import jwt from "jsonwebtoken";
import express, { Response, Request } from "express";
const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const reslt = await store.index();
    res.status(200);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (_req: Request, res: Response) => {
  const id = parseInt(_req.params.id);
  try {
    const reslt = await store.show(id);
    res.status(200);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RuYW1lIjoiQWxhYSBlbCBkaW4iLCJwYXNzd29yZCI6IiQyYiQxMCR1TjRzRTMwNG1rQWxCdUtxUzJFWU1PeWNiNzRZR0ZjS3JhUXRZcW1QaGdmZndMclVCMEtYSyIsImxhc3RuYW1lIjoic2FpZiJ9LCJpYXQiOjE2NDE3OTQwMzV9.0Jkab_kGAq10hKmL3grxdifjW48XWlH1eWGIftPFO_Q
const addProduct = async (_req: Request, res: Response) => {
  const auth: string = _req.headers.authorization as unknown as string;
  try {
    jwt.verify(auth, process.env.TOKEN_SECRET as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token ${err}`);
    return;
  }
  try {
    const reslt = await store.CreateProduct(
      _req.body.name,
      _req.body.price,
      _req.body.category
    );
    res.status(200);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const product_routes = (app: express.Application) => {
  app.get("/product", index);
  app.get("/product/:id", show);
  app.post("/product", addProduct);
};
export default product_routes;
