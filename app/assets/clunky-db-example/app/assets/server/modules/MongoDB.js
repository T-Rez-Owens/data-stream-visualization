/* jshint node: true */
/*jshint esversion: 6 */
/*jshint laxcomma:true */
'use strict';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'),
    moment = require('moment'),
    path = require('path');

class MongoDB{
    constructor(uri) {
        this.uri = uri;
        this.db = {};
        
        
        return this;
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
    mongoDatabaseGrabName (callback) {
        var dbPromise = this.connect();
        //console.log(dbPromise);
        return dbPromise.then(db => {
            //console.log(db.s.databaseName);
            console.log("Connected to: ", db.s.databaseName);
            callback(db.s.databaseName);
        },()=>{});
        
        //console.log(db.dbNameString);
        
    }
    mongoDataGrabOne (callback){
        var dbPromise = this.connect();
        return dbPromise.then(db =>{
            let cursor = db.collection('points').findOne(
                { }
              , { _id: false }
              , (err, cursor) => {
                    if (err) reject(err);
                    if (cursor) {
                        callback(cursor);
                    } else {
                        callback({});
                    }
                }
            );
        });
        
    }
    mongoDataGrabSensor(sensor, callback) {
        var dbPromise = this.connect();
        return dbPromise.then(db =>{
            let cursor = db.collection('points').findOne(
                {"sensor":sensor.sensor }
              , { _id: false }
              , (err, cursor) => {
                    if (err) reject(err);
                    if (cursor) {
                        callback(cursor);
                    } else {
                        callback({});
                    }
                }
            );
        });
    }
    mongoDataGrabSensorArray(sensor, callback) {
        var dbPromise = this.connect();
        return dbPromise.then(db =>{
            var options = {};
            options.sensor = sensor;
            options.limit = sensor.limit !== undefined ? sensor.limit : 10;
            options.skip = 0;
            var projection = { _id: false };
            var query = this.queryDocument(options);
            var cursor = db.collection('points').find(query);
            cursor.project(projection);
            db.collection('points').find(query).count(function(err,numOfSensors){
                console.log(`Returning ${options.limit} of ${numOfSensors}`);
                
            });
            
            
            cursor.limit(options.limit);
            cursor.skip(options.skip);
            cursor.sort([["_id",-1]]);//latest n docs without having to worry about time-stamp formatting.
            callback(cursor);    
        });
    }
    mongoDataGrabProductArray(product,callback){
        var dbPromise = this.connect();
        return dbPromise.then(db =>{
            var query = {
                "product":product.name
            };
            var options = {};
            options.product = product;
            options.limit = product.limit !== undefined ? product.limit : 10;
            options.skip = 0;
            var projection = { _id: false };
            var cursor = db.collection('products').find(query);
            cursor.project(projection);
            db.collection('products').find(query).count(function(err,numOfProducts){
                console.log(`Returning ${options.limit} of ${numOfProducts}`);
                
            });
            
            
            cursor.limit(options.limit);
            cursor.skip(options.skip);
            cursor.sort([["_id",-1]]);//latest n docs without having to worry about time-stamp formatting.
            callback(cursor);    
        });
    }
    mongoDataGrabInProgressArray(product,callback){
        var dbPromise = this.connect();
        return dbPromise.then(db =>{
            var query = {};
            //console.log(query);
            var options = {};
            options.product = product;
            options.limit = product.limit !== undefined ? product.limit : 31;
            options.skip = 0;
            var projection = {};
            var cursor = db.collection('inProgress').find(query);
            cursor.project(projection);
            db.collection('inProgress').find(query).count(function(err,numOfProducts){
                console.log(`Returning ${options.limit} of ${numOfProducts}`);
                
            });
            
            
            cursor.limit(options.limit);
            cursor.skip(options.skip);
            cursor.sort([["_id",-1]]);//latest n docs without having to worry about time-stamp formatting.
            callback(cursor);    
        });
    }
    queryDocument(options) {
            //console.log(options);
            var query = {
                "sensor": options.sensor.sensor,
            };
            //console.log(query);
            return query;
    }
    insertSensor(sensor,callback){
      
        if(parseInt(sensor.value,10).isNan || sensor.sensor==null){
            console.log("bad sensor");
        } else {
            var dbPromise = this.connect();
            return dbPromise.then(db =>{
                db.collection('points').insertOne(
                    {"sensor":sensor.sensor, "value":parseInt(sensor.value,10), "time":sensor.time }
                  , (err,result) => {
                        if (err) reject(err);
                        if (result) {
                            console.log(`finished inserting ${result.insertedCount}  ${sensor.sensor} sensor with value:${parseInt(sensor.value,10)}`);
                            callback(result);
                        } else {
                            callback({});
                        }
                    }
                );
            });
        }
        
    }
    insertProduct(product,callback){
      
        if(product.partsPerHour.isNan || product.name==null){
            console.log("bad product");
        } else {
            var dbPromise = this.connect();
            return dbPromise.then(db =>{
                db.collection('products').insertOne(
                    {"product":product.name, "partsPerHour":product.partsPerHour, "time":product.time }
                  , (err,result) => {
                        if (err) reject(err);
                        if (result) {
                            console.log(`finished inserting ${result.insertedCount}  ${product.name} product with value:${parseInt(product.partsPerHour,10)}`);
                            callback(result);
                        } else {
                            callback({});
                        }
                    }
                );
            });
        }
        
    }

    insertSchedule(schedule,callback){
      
        if(schedule.schedToday[0][0].isNan || schedule.date==null){
            console.log("bad/no product");
        } else {
            var dbPromise = this.connect();
            return dbPromise.then(db =>{
                db.collection('schedule').insertOne(
                    schedule
                  , (err,result) => {
                        if (err) reject(err);
                        if (result) {
                            console.log(`finished inserting ${result.insertedCount}`);
                            callback(result);
                        } else {
                            callback({});
                        }
                    }
                );
            });
        }
        
    }
    
    aggregateProductNames(callback){
        var dbPromise = this.connect();
        var products =[];
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return dbPromise.then(db=>{
        
            db.collection('products').aggregate([
                
                /* now group by tags, counting each tag */
                {"$group": 
                    {
                        "_id":"$product",
                        count:{$avg:"$partsPerHour"}
                    }
                },
                {"$project":
                {
                    _id:0,
                    name:"$_id"
                }
                },
                {$sort:{
                    name:1
                }}

            
                /* change the name of _id to be tag */
                
            ],(err,result)=>{
                if(err) throw (err);
                if(result) {
                    //console.log(result);
                    var sum =0;
                    result.forEach(product => {
                        products.push(capitalizeFirstLetter(product.name));
                    });
                }
                callback(products);
            });    
        });
    }
    aggregateInProgressList(callback){
        var dbPromise = this.connect();
        var products =[];
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return dbPromise.then(db=>{
            
            db.collection('inProgress').findOne((err,doc)=>{
                var array =[];
                for(var key in doc){
                    array.push(key);
                    console.log(key);
                } 

                callback(array);
            });
            
            /*

            db.collection('inProgress').aggregate([
                
                {"$group": 
                    {
                        "_id":"$product",
                        count:{$avg:"$partsPerHour"}
                    }
                },
                {"$project":
                {
                    _id:0,
                    name:"$_id"
                }
                },
                {$sort:{
                    name:1
                }}
                
            ],(err,result)=>{
                if(err) throw (err);
                if(result) {
                    //console.log(result);
                    var sum =0;
                    result.forEach(product => {
                        products.push(capitalizeFirstLetter(product.name));
                    });
                }
                callback(products);
            });*/    
        });
    }
    
    aggregateProductPartsPerHour(productName,callback){
        var dbPromise = this.connect();
        var products =[];
        return dbPromise.then(db=>{
        
            db.collection('products').aggregate([
                {"$match":{
                    product:productName
                }},
                /* now group by tags, counting each tag */
                {"$group": 
                    {
                        "_id":"$product",
                        count:{$avg:"$partsPerHour"}
                    }
                },
                {"$project":
                {
                    _id:0,
                    name:"$_id",
                    PPH:'$count'
                }
                }
            
                /* change the name of _id to be tag */
                
            ],(err,result)=>{
                if(err) throw (err);
                if(result) {
                    //console.log(result);
                    var sum =0;
                    result.forEach(product => {
                        products.push(product);
                    });
                }
                callback(products);
            });    
        });
    }
    mongoClose(){
        var dbPromise = this.connect();
        return dbPromise.then(db=>{
            db.close();
        });
        
    }
}

module.exports = MongoDB;


