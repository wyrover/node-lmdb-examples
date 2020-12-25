import lmdb from 'node-lmdb'
import levelup from 'levelup'
import leveldown from 'leveldown'

async function test_lmdb() {
  console.log('Current lmdb version is', lmdb.version)
  let env = new lmdb.Env()
  env.open({
    path: __dirname + '/mydata',
    mapSize: 50 * 1024 * 1024, // maximum database size
    maxDbs: 3,
  })

  let dbi = env.openDbi({
    name: 'db1',
    create: true,
  })

  var txn = env.beginTxn()
  var value = txn.getString(dbi, 1)

  console.log(value)

  if (value === null) {
    txn.putString(dbi, 1, 'Hello world!')
  } else {
    txn.del(dbi, 1)
  }

  txn.putString(dbi, 2, "Yes, it's this simple!")
  txn.commit()

  console.log('11111111111')

  dbi.close()
  env.close()
}

async function test_leveldb() {
  let db = levelup(leveldown('./mydb'))

  db.put('name', 'levelup', function(err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // 3) Fetch by key
    db.get('name', function(err, value) {
      if (err) return console.log('Ooops!', err) // likely the key was not found

      // Ta da!
      console.log('name=' + value)
    })
  })
}

;(async function main() {
  test_lmdb()
  test_leveldb()
})()
