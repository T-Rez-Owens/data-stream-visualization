'use strict'

const MonServer = require('../app/assets/server/modules/server.js');

describe('Server', () => {
    let server;
    let port = 3000;
    let local = 1;
    server = new MonServer(port,local);
    test('should say the data is peanut butter', done => {
        var dbName = 'peanut butter';
        function callback(data){
            expect(data).toBe(dbName);
            done();
        }
    server.grabMongoData(dbName, callback);
    });
    test('should return a report', (done) => {
        var dbName = "mityLite";
        function callback(data){
            expect(data).toBe(dbName);
            done();
        }
        server.grabMongoData(dbName,callback);
        
      });
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

