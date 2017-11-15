'use strict';

require('babel-polyfill');

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

app.get('/', function (req, res, next) {
    res.render('./client/views/add_dataPoint', {});
});

app.post('/add_dataPoint', function (req, res, next) {
    var sensor = req.body.sensor;
    var value = req.body.value;
    var date = new Date();
    var time = moment().format('llll');

    if (sensor == '' || value == '') {
        next('Please provide an entry for all fields.');
    } else {
        mongoReadyPromise.then(db => {
            db.collection('points').insertOne({ 'sensor': sensor, 'value': value, 'time': time }, function (err) {
                assert.equal(null, err);
                db.collection('points').find({ 'sensor': sensor }).toArray(function (err, docs) {
                    res.render('./client/views/sensor', { 'points': docs, 'value': value });
                });
            });
        });
    }
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
/*'use strict'

const MongoClient = require('mongodb')

class Database {

  constructor (uri) {
    this.uri = uri
    this.db = {}
    return this
  }

  connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.uri, (err, db) => {
        if (err) reject(err)
        this.db = db
        resolve(this)
      })
    })
  }

  addReport (domain) {
    return new Promise((resolve, reject) => {
      this.db.collection('domains').findAndModify(
        { domain: domain }
      , {}
      , { $inc: { reported: 1 } }
      , { new: true, upsert: true }
      , (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })

  }

  findReport (domain) {
    return new Promise((resolve, reject) => {
      this.db.collection('domains').findOne(
        { domain: domain }
      , { _id: false, reported: true }
      , (err, data) => {
          if (err) reject(err)
          if (data) {
            resolve(data.reported)
          } else {
            resolve(0)
          }
        })
    })
  }
}

module.exports = Database
*/
"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert'),
    path = require('path');
require('dotenv').load();
var uri = 'mongodb://' + process.env.USER + ':' + process.env.PASS + '@' + process.env.HOST + ':' + process.env.PORT + '/' + process.env.DB;

class MongoDB {
    constructor() {
        this.connect();
    }

    connect() {
        var mongoReadyPromise = new Promise((resolve, reject) => {
            MongoClient.connect(uri, function (err, db) {
                if (err !== null) {
                    reject(err);
                }
                assert.equal(null, err);
                console.log("Successfully connected to /%s.", db.s.databaseName);
                resolve(db);
            });
        });
        module.exports = mongoReadyPromise;
    }

}

exports.default = MongoDB;
"use strict";
//# sourceMappingURL=server.js.map
