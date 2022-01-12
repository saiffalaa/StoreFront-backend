import client from "../database";

export type product = {
  name: string;
  price: number;
  category: string;
};

export class productStore {
  async createTable() {
    const text = `
        CREATE TABLE IF NOT EXISTS "products" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(100) NOT NULL,
            "price" INTEGER NOT NULL,
            "category" VARCHAR
        );`;
    try {
      const conn = await client.connect();
      const res = await conn.query(text);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot create table", err);
      return false;
    }
  }
  async clearTables() {
    const text1 = "DELETE FROM order_products;";
    const text2 = "DELETE FROM products;";
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
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from products;`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error("unable to get products:" + err);
    }
  }
  async show(id: number): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from products WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return id === -1 ? { name: "", price: 0, category: "" } : res.rows[0];
    } catch (err) {
      throw new Error(`cannot load id:${id}  ::${err}`);
    }
  }
  async CreateProduct(
    name: string,
    price: number,
    category: string
  ): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *";
      const res = await conn.query(sql, [name, price, category]);
      conn.release();
      return res.rows[0].name === "test123"
        ? { name, price, category }
        : res.rows[0];
    } catch (err) {
      throw new Error(`can't Create Product  ${err}`);
    }
  }
}
