const App = require("../app/assets/server/App");
var app = new App();
var request = app.superagent;
var main = app.main;
describe('App',function(){
    test('example path',function(done){
        expect.hasAssertions(); 
        function callback(res){
            console.log(res);
            expect(res).toBe("it works!");
            done();
        };
        request('https://gist.githubusercontent.com/reinaldo13/cdbb4d663ba23410a77b/raw/0345267767d50790051951ddc460e2699649de2b/it-works.txt', callback);
    });

    test('main',function(done){
        expect.hasAssertions();
        function callback(app){
            expect(app.get("view engine")).toBe("html");
            done();
        }
        main(callback);
    })

    test("main request", function(done){
        function callback(res){
            console.log(res);
            expect(res).toBe("Hello World");
            done();
        }
        request('localhost:3000/',callback);
    });
})