var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    moment = require('moment'),
    path = require('path'),
    uri = require('../server');
    require('dotenv').load();

//var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
console.log(uri);

/*
MongoClient.connect(uri, function (err, db) {
    
    assert.equal(null, err);
    console.log("Successfully connected to /%s.", uri);

    db.collection('points').find({'sensor':sensor}).toArray(function(err,docs){
        console.log("found:", doc.sensor, " ", doc.value );
    });
    
});
*/