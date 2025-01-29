import db from "./db.js";

function getColumnsForSave(schema) {
  return Object.keys(schema.columns).filter(
    (col) =>
      col !== schema.primaryKey &&
      schema.columns[col].usePostgresDefault !== true,
  );
}

class Model {
  #isDirty = false;
  #data = {};

  static async find(id) {
    return this.findWhere({
      where: `${this.schema.primaryKey} = $1`,
      params: [id],
    });
  }

  static async findWhere(opts = {}) {
    const res = await db().query(
      `
        SELECT *
        FROM ${this.schema.tableName}
        ${opts.where ? `WHERE ${opts.where}` : ""}
        ${opts.orderBy ? `ORDER BY ${opts.orderBy}` : ""}
        LIMIT 1
      `,
      opts.params || [],
    );

    return new this(res.rows[0]);
  }

  static async fetchAll(opts = {}) {
    const { schema } = this;

    const res = await db().query(
      `
        SELECT *
        FROM ${schema.tableName}
        ${opts.where ? `WHERE ${opts.where}` : ""}
        ${opts.orderBy ? `ORDER BY ${opts.orderBy}` : ""}
        ${opts.limit ? `LIMIT ${opts.limit}` : ""}
      `,
      opts.params || [],
    );

    return res.rows.map((row) => new this(row));
  }

  static async create(data) {
    const { schema } = this;

    const cols = getColumnsForSave(schema);
    const fields = [];
    const params = [];
    let paramsN = 1;
    for (const col of cols) {
      params.push(data[col]);
      fields.push(`$${paramsN++}`);
    }

    const res = await db().query(
      `INSERT INTO ${schema.tableName} (${cols.join(", ")})
      VALUES (${fields.join(", ")}) RETURNING *`,
      params,
    );

    return new this(res.rows[0]);
  }

  constructor(data) {
    this.#data = data;
  }

  getId() {
    const { schema } = this.constructor;

    return this.#data[schema.primaryKey];
  }

  getData(field = null) {
    return field ? this.#data[field] : this.#data;
  }

  setData(data) {
    Object.assign(this.#data, data);
    this.#isDirty = true;
  }

  async update() {
    if (!this.#isDirty) {
      return;
    }

    const { schema } = this.constructor;

    const cols = getColumnsForSave(schema);

    const fields = [];
    const params = [this.getId()];
    let paramsN = params.length + 1;
    for (const col of cols) {
      params.push(this.#data[col]);
      fields.push(`${col} = $${paramsN++}`);
    }

    if (schema.columns.updated_at) {
      fields.push("updated_at = NOW()");
    }

    try {
      await db().query(
        `UPDATE ${schema.tableName} SET ${fields.join(", ")}
          WHERE ${schema.primaryKey} = $1`,
        params,
      );
    } catch (e) {
      console.log(e);
      console.error(
        `error saving ${schema.tableName} with id ${this.getId()}: ${e}`,
      );
      throw e;
    }
  }
}

export default Model;
