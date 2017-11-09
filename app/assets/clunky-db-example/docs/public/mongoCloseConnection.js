// mongoOpenConnection.js
var mongoReadyPromise = require('./mongoOpenConnection');
mongoReadyPromise.then(db => {
    console.log("Closing DB: ", db.s.databaseName);
    db.close();
    console.log("DB Closed");
});
