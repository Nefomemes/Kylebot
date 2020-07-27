const {MongoClient} = require("mongodb");
const assert = require("assert");

const url = process.env.DB;

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
   module.exports.dbClient = client;
  });

