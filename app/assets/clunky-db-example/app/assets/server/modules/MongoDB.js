var MongoClient = require('mongodb');
var assert = require('assert'),
    path = require('path');

class MongoDB{
    constructor(uri) {
        this.uri = uri;
        //this.db = {};
        this.connect();
        
    }

    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.uri, function(err, db) {
                if(err!==null){
                    reject(err);
                }
                assert.equal(null, err);
                //console.log("Successfully connected to /%s.", db.s.databaseName);

                resolve(db);
            });
        });
        //module.exports = mongoReadyPromise;
    }
}

module.exports = MongoDB;


