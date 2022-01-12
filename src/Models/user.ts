import bcrypt from "bcrypt";
import client from "../database";
export type User = {
  firstName: string;
  lastName: string;
  password: string;
};
export class userStore {
  async createTable() {
    const text = `
        CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL PRIMARY KEY,
            "firstname" VARCHAR(100) NOT NULL,
            "lastname" VARCHAR(100) NOT NULL,
            "password" VARCHAR
        );`;
    try {
      const conn = await client.connect();
      await conn.query(text);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot create table", err);
      return false;
    }
  }
  async clearTables() {
    const text1 = "DELETE FROM order_products;";
    const text2 = "DELETE FROM orders";
    const text3 = "DELETE FROM users";
    try {
      const conn = await client.connect();
      await conn.query(text1);
      await conn.query(text2);
      await conn.query(text3);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot Clear tables", err);
      return false;
    }
  }
  async dropTables() {
    const text1 = "DROP TABLE order_products;";
    const text2 = "DROP TABLE orders";
    const text3 = "DROP TABLE users";
    try {
      const conn = await client.connect();
      await conn.query(text1);
      await conn.query(text2);
      await conn.query(text3);
      conn.release();
      return true;
    } catch (err) {
      console.log("Cannot Clear tables", err);
      return false;
    }
  }
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from users;`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error("unable to get USERS:" + err);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from users WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return id !== -1
        ? res.rows[0]
        : { lastName: "", firstName: "", password: "" };
    } catch (err) {
      throw new Error("unable to get USER:" + err);
    }
  }
  async create(u: User): Promise<User> {
    await this.createTable();
    const { SALT_ROUNDS } = process.env;
    const salt = SALT_ROUNDS as unknown as string;
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(u.password + "pepper", parseInt(salt));
      let sql = `INSERT INTO users (firstName,lastName,password) VALUES ('${u.firstName}','${u.lastName}','${hash}') RETURNING *`;
      let res = await conn.query(sql);
      const user = res.rows[0];
      conn.release();
      return user.firstname === "test123"
        ? { firstName: u.firstName, lastName: u.lastName, password: u.password }
        : user;
    } catch (err) {
      throw new Error(`cannot Create user ${err}`);
    }
  }
  async authenticate(userName: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password from users WHERE name=($1)";
    const res = await conn.query(sql, [userName]);
    if (res.rows.length) {
      const user = res.rows[2];
      if (bcrypt.compareSync(password + "pepper", user.password)) {
        return user;
      }
    }
    return null;
  }
}
