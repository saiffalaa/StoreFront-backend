import { Order, ordr, orderStore } from "../Models/order";
import jwt from "jsonwebtoken";
import express, { Response, Request } from "express";
const store = new orderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const addOrder = async (_req: Request, res: Response) => {
  const order: ordr = {
    status: _req.body.status,
    user_id: parseInt(_req.body.user_id),
  };
  const reslt = await store.createOrder(order);
  res.json(reslt);
};
const addProduct = async (_req: Request, res: Response) => {
  try {
    const order_id = _req.params.id;
    const product_id = _req.body.product_id;
    const quantity = _req.body.quantity;
    const reslt = await store.addProduct(quantity, product_id, order_id);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getActiveOrderByUser = async (_req: Request, res: Response) => {
  const auth: string = _req.headers.authorization as unknown as string;
  try {
    jwt.verify(auth, process.env.TOKEN_SECRET as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token ${err}`);
    return;
  }
  try {
    const user_id = parseInt(_req.params.id);
    const status = _req.params.status;
    let reslt;
    if (status === "active") {
      reslt = await store.getActiveOrderByUser(user_id);
    } else if (status === "completed") {
      reslt = await store.getCompletedOrderByUser(user_id);
    } else reslt = await store.index();
    res.status(200);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// const getCompletedOrderByUser = async (_req: Request, res: Response) => {
//   try {
//     const user_id = parseInt(_req.params.id);
//     const reslt = await store.getCompletedOrderByUser(user_id);
//     res.json(reslt);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };
const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.post("/orders", addOrder);
  app.post("/orders/:id/products", addProduct);
  app.get("/orders/:status/user/:id", getActiveOrderByUser);
};
export default order_routes;
