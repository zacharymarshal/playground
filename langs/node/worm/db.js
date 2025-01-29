import DbClient from "./DbClient.js";

let db = null;

async function connect(opts) {
  db = new DbClient(opts);
  await db.connect();
}

function getDb() {
  return db;
}

export default getDb;
export { connect };
