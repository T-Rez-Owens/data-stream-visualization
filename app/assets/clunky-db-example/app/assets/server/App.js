var express = require('express'),
app = express(),
engines = require('consolidate'),
bodyParser = require('body-parser'),
assert = require('assert'),
moment = require('moment'),
path = require('path');
const request = require('superagent');

class App {
    constructor() {
        return this;
    }
    superagent(url,callback) {
        request.get(url, function(err, res){
            if (err) throw err;
            //console.log(res.text);
            //console.log(res);
            callback(res.text);
        });
    }
    main(callback) {
        app.use(express.static(path.join(__dirname + '/public')));
        
        app.set('view engine', 'html');
        app.set('views', __dirname + '/views');
        app.engine('html', engines.nunjucks);
        app.use(bodyParser.urlencoded({ extended: true })); 
        
        
        // Handler for internal server errors
        function errorHandler(err, req, res, next) {
            console.error(err.message);
            console.error(err.stack);
            res.status(500).render('./client/views/error_template', { error: err });
        }
        
        app.use(errorHandler);

        app.get('/helloWorld', function(req,res){
            res.send("Hello World");
        })


        callback(app)
        }
    }

module.exports = App;