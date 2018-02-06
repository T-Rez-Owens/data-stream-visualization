/* jshint node: true */
/*jshint esversion: 6 */

'use strict';
var express = require('express');
const Router = require('./App');

var app = new Router();



class Server {
    constructor() {
        return this;
    }

    startListening (route, callback) { 
        app.main((app2)=>{
            let server = app2.listen(80, function() {
                
                let port = server.address().port;
                console.log(`Express server listening on port ${port}`);
                if (process.send) {
                    process.send('online');
                }
            });    
        });
    }
}

module.exports = Server;