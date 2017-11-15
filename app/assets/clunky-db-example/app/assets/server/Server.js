import "babel-polyfill";

var express = require('express'),
    app = express(),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    mongoReadyPromise = require('./modules/MongoDB'),
    DrawLineGraph = require('./modules/ServerDrawLineGraph'),
    assert = require('assert'),
    moment = require('moment'),
    path = require('path');


app.use(express.static(path.join(__dirname + '/public')));
app.engine('html', nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 


// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('./client/views/error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('./client/views/add_dataPoint', {});
});

app.post('/add_dataPoint', function(req, res, next) {
    var sensor = req.body.sensor;
    var value = req.body.value;
    var date = new Date();
    var time = moment().format('llll');

    if ((sensor == '') || (value == '') ) {
        next('Please provide an entry for all fields.');
    } else {
        mongoReadyPromise.then(db => {
            db.collection('points').insertOne(
                { 'sensor': sensor, 'value': value, 'time': time },
                function (err) {
                    assert.equal(null, err);
                    db.collection('points').find({'sensor':sensor}).toArray(function(err,docs){
                        res.render('./client/views/sensor', { 'points' : docs, 'value': value});
                    });
                }
            );
        });
    }
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
