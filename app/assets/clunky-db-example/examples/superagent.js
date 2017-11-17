//superagent.js
var request = require('superagent');

function superagent(url,callback) {

    request.get(url, function(err, res){
        if (err) throw err;
        console.log(res.text);
        console.log(res);
        callback(res.text);
    });

    
}


module.exports = superagent;