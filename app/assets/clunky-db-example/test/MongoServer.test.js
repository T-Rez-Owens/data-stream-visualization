'use strict'

const MongoS = require('../app/assets/server/modules/MongoDB.js');
require('dotenv').load();
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;            

describe('MongoS Should do basic things:', () => {
    var server;
    server = new MongoS(uri);
    test('connect to mitydata', done => {
        var dbName = 'mitydata';
        expect.assertions(1);
        function callback(data){
            expect(data).toBe(dbName);
            done();
        }
        server.mongoDatabaseGrabName(callback);
    });
    test('return a single object', (done) => {
        expect.assertions(1);
        function callback(data){
            expect(data).toHaveProperty("sensor");
            done();
        }
        server.mongoDataGrabOne(callback);
        
      });
      test('return a point from a sensor of specified type', (done) => {
        const sensor = {
            sensor:"Non-random-Test"
        };
        expect.assertions(1);
        function callback(data){
            expect(data).toMatchObject(sensor);
            done();
        }
        server.mongoDataGrabSensor(sensor, callback);
        
      });
      
});

describe('MongoS Should do advanced things:', () => {
    let server;
    server = new MongoS(uri);
    test('return an array from a sensor of specified type', (done) => {
        const Sensor = {
            sensor:"Non-random-Test"
        };
        const sensorArray = [
            {sensor:Sensor.sensor}
        ];
        function callback(cursor){
            expect.hasAssertions();
            var count = 0;
            cursor.forEach(sensor => {
                expect(sensor).toHaveProperty("sensor", Sensor.sensor);
                expect(sensor).toHaveProperty("value");
                expect(sensor).toHaveProperty("time");
                count=count+1;
                //console.log(sensor);
            },function(err){
                expect(err).toBe(null);
                expect(count).toBeGreaterThan(0);
                console.log("Found: ",count,Sensor.sensor+" sensors");
                expect(count).toBeLessThan(11);
                done();
            });
            
        }
        server.mongoDataGrabSensorArray(Sensor, callback);
        
    });

    test('get lux array', (done) => {
        expect.hasAssertions();
        const Sensor = {
            sensor:"lux"
        };
        const sensorArray = [
            {sensor:Sensor.sensor}
        ];
        function callback(cursor){
            var count = 0;
            var data = [];
            cursor.forEach(sensor => {
                expect(sensor).toHaveProperty("sensor", Sensor.sensor);
                expect(sensor).toHaveProperty("value");
                expect(sensor).toHaveProperty("time");
                data.push(sensor);
                count=count+1;
            },function(err){
                expect(err).toBe(null);
                expect(count).toBeGreaterThan(0);
                expect(count).toBeLessThan(11);
                console.log("Found: ",count,Sensor.sensor+" sensors");
                console.log(data);
                done();
                
            });
            
        }
        server.mongoDataGrabSensorArray(Sensor, callback);
    });
    test("unwritten",(done)=>{
        expect.hasAssertions();

        expect(true).toBe(true);
        done();
    });
});