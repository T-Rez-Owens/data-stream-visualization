'use strict';// jshint ignore:line

const Database = require('./database'), 
  dbUrl = 'mongodb://localhost:27017/test', //<process.env.MONGODB_URI ||> was included in the gist this is copied from.
  assert = require('assert');

describe('Database', () => {
  let database;

  beforeEach((done) => {
    database = new Database(dbUrl);
    database.connect()
      .then(() => { done() })
      .catch((err) => { done(err);});
  });

  afterEach(() => {
    database.db.dropDatabase();
  });

  it('should add a domain to the database with one report', (done) => {
    database.addReport('google.com')
      .then((data) => {
        assert.equal(data.value.domain, 'google.com', 'domain not inserted');
        return database.findReport('google.com');
      })
      .then((data) => {
        assert.equal(data, 1, 'incorrect number of reports');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});