const request = require('supertest');
const express = require('express');
const app2 = express();

app2.get('/user', function(req, res) {
    res.status(200).json({ name: 'tobi' });
  });
  
describe('GET /user', function() {
    it('respond with json', function(done) {
    request(app2)
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});