// test.js
var MongoClient = require('mongodb').MongoClient,
mongoReadyPromise = require('./mongoOpenConnection');


mongoReadyPromise.then(db => {
    console.log("my DB: ", db);
});
