'use strict'

const MonServer = require('../app/assets/server/modules/server.js');

describe('MongoDB Server Should:', () => {
    let server;
    let port = 3000;
    let local = 1;
    server = new MonServer(port,local);
    test('connect to mitydata', done => {
        var dbName = 'mitydata';
        function callback(data){
            expect(data).toBe(dbName);
            done();
        }
    server.grabMongoDatabaseName(callback);
    });
    test('return a single object', (done) => {
        
        function callback(data){
            expect(data).toHaveProperty("sensor");
            done();
        }
        server.grabMongoData(callback);
        
      });
    
    //These were just experiments and not needed functionality.
    test(`should set the port to ${port}`, (done) =>{
        var data = server.port;
        expect(data).toBe(port);
        done();
    });
    it(`should set local to ${local}`, (done) =>{
         var data = server.local;
         expect(data).toBe(local);
         done();
     });
});

