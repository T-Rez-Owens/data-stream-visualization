var MongoClient = require('mongodb');
var assert = require('assert'),
    path = require('path');

require('dotenv').load();
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;

class MongoDB{
    constructor() {
        this.connect();
    }

    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, function(err, db) {
                if(err!==null){
                    reject(err);
                }
                assert.equal(null, err);
                console.log("Successfully connected to /%s.", db.s.databaseName);
                resolve(db);
            });
        });
        //module.exports = mongoReadyPromise;
    }
}

module.exports = MongoDB;


