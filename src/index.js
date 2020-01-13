import lmdb from 'node-lmdb';

(async function main() {
  console.log('Current lmdb version is', lmdb.version);
  let env = new lmdb.Env();
  env.open({
    path: __dirname + '/mydata',
    mapSize: 50 * 1024 * 1024, // maximum database size
    maxDbs: 3
  });

  let dbi = env.openDbi({
    name: 'db1',
    create: true
  });

  var txn = env.beginTxn();
  var value = txn.getString(dbi, 1);

  console.log(value);

  if (value === null) {
    txn.putString(dbi, 1, 'Hello world!');
  } else {
    txn.del(dbi, 1);
  }

  txn.putString(dbi, 2, "Yes, it's this simple!");
  txn.commit();

  console.log('11111111111');

  dbi.close();
  env.close();
})();
