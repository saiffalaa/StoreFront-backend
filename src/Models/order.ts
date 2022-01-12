import client from "../database";

export type Order = {
  quantity: number;
  order_id: string;
  product_id: string;
};
export type ordr = {
  status: string;
  user_id: number;
};

export class orderStore {
  async createTable() {
    const text1 = `
        CREATE TABLE IF NOT EXISTS "orders" (
            "id" SERIAL PRIMARY KEY,
            "user_id" bigint REFERENCES users(id),
            "status" VARCHAR
        );`;
    const text2 = `
        CREATE TABLE IF NOT EXISTS "order_products" (
            "id" SERIAL PRIMARY KEY,
            "product_id" bigint REFERENCES users(id),
            "order_id" bigint REFERENCES users(id),
            "quantity" VARCHAR
        );`;
    try {
      const conn = await client.connect();
      await conn.query(text1);
      await conn.query(text2);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot create table", err);
      return false;
    }
  }
  async clearTables() {
    const text1 = "DELETE FROM order_products;";
    const text2 = "DELETE FROM orders;";
    try {
      const conn = await client.connect();
      await conn.query(text1);
      await conn.query(text2);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot Clear tables", err);
      return false;
    }
  }

  async index(): Promise<ordr[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from orders`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error("unable to get orders:" + err);
    }
  }
  async createOrder(o: ordr): Promise<ordr> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING status,user_id";
      const res = await conn.query(sql, [o.status, o.user_id]);
      // sql = "SELECT * from order_products WHERE "
      const order = res.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`can't add order:  ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    product_id: string,
    order_id: string
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING quantity,order_id,product_id";
      const res = await conn.query(sql, [quantity, order_id, product_id]);
      // sql = "SELECT * from order_products WHERE "
      const order = res.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `can't add product ${product_id} to order ${order_id}:  ${err}`
      );
    }
  }
  async getActiveOrderByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `select * from orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=${user_id} AND status='active';`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Can't load orders of user ${user_id} :${err}`);
    }
  }
  async getCompletedOrderByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `select * from orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=${user_id} AND status='completed';`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`Can't load orders of user ${user_id} :${err}`);
    }
  }
}
