import jwt from "jsonwebtoken";
import { User, userStore } from "../Models/user";
import express, { Response, Request } from "express";
const store = new userStore();
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstName: _req.body.lastName,
    lastName: _req.body.firstName,
    password: _req.body.password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string
    );
    res.status(200);
    // console.log(res.statusCode);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json((err as unknown as string) + user);
  }
};
const index = async (_req: Request, res: Response) => {
  const auth: string = _req.headers.authorization as unknown as string;
  try {
    jwt.verify(auth, process.env.TOKEN_SECRET as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token ${err}`);
    return;
  }
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
  const auth: string = _req.headers.authorization as unknown as string;
  try {
    jwt.verify(auth, process.env.TOKEN_SECRET as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token ${err}`);
    return;
  }
  try {
    const reslt = await store.show(parseInt(_req.params.id));
    res.status(200);
    res.json(reslt);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const user_routes = (app: express.Application) => {
  app.post("/users/signup", create);
  app.get("/users", index);
  app.get("/users/:id", show);
};
export default user_routes;
