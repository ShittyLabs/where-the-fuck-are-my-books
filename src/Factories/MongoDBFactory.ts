import { Db, MongoClient } from 'mongodb';
import { config } from 'node-config-ts';

let _db: Db;

(async function () {
  _db = await (
    await MongoClient.connect(config.mongodb.connectionString, {
      useUnifiedTopology: true
    })
  ).db();
})();

export const MongoDBFactory = {
  get db(): Db {
    return _db;
  }
};
export let db = () => _db;
