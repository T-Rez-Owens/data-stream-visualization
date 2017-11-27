'use strict'
var express = require('express');
const Router = require('./App');
var app = new Router();



class Server {
    constructor() {
        return this;
    }

    startListening (route, callback) { 
        app.main((app2)=>{
            let server = app2.listen(3000, function() {
                let port = server.address().port;
                console.log(`Express server listening on port ${port}`);
            });    
        });
        

        function callback() {
            return 5;
        }
        
    }
}

module.exports = Server;