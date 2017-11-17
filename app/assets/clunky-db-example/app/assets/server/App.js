var express = require('express'),
app = express(),
nunjucks = require('nunjucks'),
bodyParser = require('body-parser'),
assert = require('assert'),
moment = require('moment'),
path = require('path');
const request = require('superagent');

class App {
    constructor() {
        return this;
    }
    main() {
       /*  app.use(express.static(path.join(__dirname + '/public')));
        //app.engine('html', nunjucks);
        app.set('view engine', 'html');
        app.set('views', __dirname + '/views');
        app.use(bodyParser.urlencoded({ extended: true })); 
        
        
        // Handler for internal server errors
        function errorHandler(err, req, res, next) {
            console.error(err.message);
            console.error(err.stack);
            res.status(500).render('./client/views/error_template', { error: err });
        }
        
        app.use(errorHandler); */
        
        }
    }

module.exports = App;