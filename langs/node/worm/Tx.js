class Tx {
  #db;
  #depth = 0;

  constructor(db) {
    this.#db = db;
  }

  async begin() {
    if (!this.#shouldBegin()) {
      return;
    }

    await this.#db.query("BEGIN");
  }

  async commit() {
    if (!this.#shouldCommit()) {
      return;
    }

    await this.#db.query("COMMIT");
  }

  async rollback() {
    if (!this.#shouldRollback()) {
      return;
    }

    await this.#db.query("ROLLBACK");
  }

  #shouldBegin() {
    return this.#depth++ === 0;
  }

  #shouldCommit() {
    if (this.#depth === 0) {
      return false;
    }

    return --this.#depth === 0;
  }

  #shouldRollback() {
    return this.#depth-- === 0;
  }
}

export default Tx;
