//superagent.js
var request = require('superagent');
class SuperAgent{
    constructor(){
        return this;
    }
    superagent(url,callback) {
        request.get(url, function(err, res){
            if (err) throw err;
            //console.log(res.text);
            //console.log(res);
            callback(res.text);
        });
    }   
}
module.exports = SuperAgent;