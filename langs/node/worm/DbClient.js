import pg from "pg";
import Tx from "./Tx.js";

class DbClient {
  #client;
  #tx;

  constructor(opts) {
    this.#client = new pg.Client(opts);
    this.#tx = new Tx(this);
  }

  async connect() {
    await this.#client.connect();
  }

  async end() {
    await this.#client.end();
  }

  async query(sql, params = []) {
    const res = await this.#client.query(sql, params);

    return res;
  }

  async begin() {
    await this.#tx.begin();
  }

  async commit() {
    await this.#tx.commit();
  }

  async rollback() {
    await this.#tx.rollback();
  }
}

export default DbClient;
