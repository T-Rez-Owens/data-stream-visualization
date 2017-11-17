const SuperAgent = require("./superagent");
var superagent = new SuperAgent();
var request = superagent.superagent;
describe('superagent',function(){
    test('example path',function(done){
        expect.hasAssertions(); 
        function callback(res){
            console.log(res);
            expect(res).toBe("it works!");
            done();
        };
        request('https://gist.githubusercontent.com/reinaldo13/cdbb4d663ba23410a77b/raw/0345267767d50790051951ddc460e2699649de2b/it-works.txt', callback);
    });
})