const { MongoClient } = require('mongodb')

let dbConnection
let uri = 'mongodb://localhost:27017/dbname'

const connectToDb = (cb) => {
    MongoClient.connect(uri)
    .then((client) =>{
        dbConnection = client.db()
        return cb()
    })
    .catch( err => {
        console.log(err)
        return cb(err)
    })
}

const getDb = () => dbConnection

module.exports = { connectToDb, getDb }
