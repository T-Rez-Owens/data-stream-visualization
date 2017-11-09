var mongoReadyPromise = require('./mongoOpenConnection');

function getData(callback) {
    mongoReadyPromise.then(db => {
        db.collection('points').find({'sensor':sensor}).toArray(function(err,docs){
            console.log("found:", doc.sensor, " ", doc.value );
        });
    });
    callback();
}

getData(function(){});