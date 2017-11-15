var MongoClient = require('mongodb');
//const Database = require('../modules/database');
const Database2 = require('../modules/MongoDB');
require('dotenv').load();
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;

//var database1 = new Database(uri);
var database2 = new Database2(uri);
//console.log("1 My db1: ", database1, "\nMy db2: ",database2);
//var dbPromise = database1.connect();
var dbPromise = database2.connect();
//console.log("2 My db1: ", dbPromise, "\nMy db2: ", dbPromise2);
//This will show 2 My db1: Promise {<pending>}.. etc


//console.log("my promise: ", mongoReadyPromise.then);


class MonServer {

    constructor (port, local=0,) {
        this.port = port;
        this.local = local;
        return this;
    }

    grabMongoDatabaseName (callback) {
        dbPromise.then(db => {
            //console.log(db.s.databaseName);
            //console.log("Connected to: ", db.s.databaseName);
            callback(db.s.databaseName);
        },()=>{});
        
        //console.log(db.dbNameString);
        
    }
    grabMongoData (callback){
        dbPromise.then(db =>{
            db.listCollections().toArray(function(err, collInfos) {
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }
                //console.log("Hello: ", collInfos);
                
            });
            var data = db.collection('points').findOne(
                { }
              , { _id: false }
              , (err, data) => {
                  if (err) reject(err)
                  if (data) {
                    callback(data);
                  } else {
                    callback({});
                  }
                })
            
            
            
        })
        
    }

    routeHandling () {
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
        
    }
}

module.exports = MonServer;