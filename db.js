const { MongoClient } = require('mongodb');
let dbConnection;
let uri = 'mongodb+srv://pepebanana:4FSmxLvt8PDUPfp@cluster0.5kwcyn6.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            })
    },
    getDB: () => dbConnection
}