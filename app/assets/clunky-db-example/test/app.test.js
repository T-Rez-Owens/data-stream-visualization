'use strict'

describe('Test the root path', () => {
    const App = require('../app/assets/server/App');
    const request = require('supertest');
    
    let app;
    let app2;
    app = new App();
    //app.address = (req,res)=>{res="hello"};//TODO: I don't think I should be setting app.address. I think supertest is expecting a superagent, but I'm not sure.
    //app.listen = function(){};
    //console.log(request(app).get(""));
    test('It should response the GET method', () => {
        //expect.assertions(1);
        //return request(app.main()).get("/").then(response => {
            //expect(response.statusCode).toBe(200)
        //})
    });
})
describe('Test the root path 2', () => {
    test('It should response the GET method', () => {
        //return request(app).get('/').expect(200);
    });
})



 
