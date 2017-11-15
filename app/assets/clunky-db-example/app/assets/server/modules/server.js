const Database = require('../modules/database');
var MongoDB = require('../modules/MongoDB');
var mongoReadyPromise = new MongoDB();
//var mongoReadyPromise = new MongoDB();

console.log("my promise: ", mongoReadyPromise.then);


class MonServer {

    constructor (port, local=0,) {
        this.port = port;
        this.local = local;
        return this;
    }

    grabMongoData (dbNameString,callback) {
        mongoReadyPromise.then(db => {
            console.log(db.dbNameString);
        },()=>{});
        
        //console.log(db.dbNameString);
        callback(dbNameString);
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