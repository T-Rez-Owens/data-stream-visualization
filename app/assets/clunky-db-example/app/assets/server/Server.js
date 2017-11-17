var express = require('express');
app = express();
class Server {
    constructor() {
        return this;
    }

    startListening (route, callback) { 
        let server = app.listen(3000, function() {
            let port = server.address().port;
            console.log('Express server listening on port %s.', port);
        });

        function callback() {
            return 5;
        }
        
    }
}

module.exports = Server;