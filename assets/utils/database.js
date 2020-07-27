
(async function(){
const {MongoClient} = require("mongodb");
const assert = require("assert");

const url = process.env.DB;

MongoClient.connect(url, function(err, dbClient) {
    assert.equal(null, err);
    
    db = dbClient.db("bot")
    module.exports.dbClient = dbClient;
    const userDB = db.collection("users");

function getUser(userID){
    return db.collection("users").findOne({userID: userID});
}

function createUser(userID){
    if(getUser(userID)) return;
    return db.collection("users").insertOne({userID: imports.message.author.id});
}

function updateUser(userID, status){
    if(!userID || !status)
    if(userID.constructor !== String)return;
    if(!getUser(userID)) createUser(userID);

    db.collection("users").updateOne({userID: userID}, { $set: status,
 $currentDate: { lastModified: true } });
}

module.exports = {
    "getUser":getUser,
    "createUser":createUser,
    "updateUser":updateUser
};

  });





})()