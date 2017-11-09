var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    mongoReadyPromise = require('./public/mongoOpenConnection'),
    assert = require('assert'),
    moment = require('moment'),
    path = require('path');

app.use(express.static(path.join(__dirname + '/public')));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 


// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('add_dataPoint', {});
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
                        res.render('sensor', { 'points' : docs, 'value': value});
                        res.container.onRendered(function() {
                            var self = this;
                            var chart = $('#chart-id').highcharts({}).highcharts();
                            self.autorun(function() { // this will always run once and then every time 'keyword' changes.
                              var keyword = Session.get('keyword');
                              self.subscribe('myCollection', keyword, function() { // subscribe to our data, passing in keyword
                                // the subscription is ready here, so go ahead and get the data into a suitable
                                // form for Highcharts - we need to build an array of data points.
                                var myData = myCollection.find().fetch().map(function(doc) {
                                  return doc.someValueIwantToPlot;
                                });
                                chart.series[0].setData(myData); // tell Highcharts to use this data for the (first) series
                              });
                            });
                          });
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