const { identity } = require("underscore");

(async function(){
const {MongoClient} = require("mongodb");
const assert = require("assert");

const url = process.env.DB;

MongoClient.connect(url, function(err, dbClient) {
    assert.equal(null, err);
    
    db = dbClient.db("bot")
    module.exports.dbClient = dbClient;
    const userDB = db.collection("users");
    const guildDB = db.collection("servers");

function getUser(userID){
    var user = userDB.findOne({userID: userID});
    if(user) return user;
    if(!user) createUser(userID);
    return userDB.findOne({userID: userID});
}
module.exports.getUser = getUser;
function createUser(userID){
    if(getUser(userID)) return;
    return userDB.insertOne({userID: userID});
}
module.exports.createUser = createUser;
function updateUser(userID, status){
    if(!userID || !status)
    if(userID.constructor !== String)return;
    if(!getUser(userID)) createUser(userID);

    return userDB.updateOne({userID: userID}, { $set: status,
 $currentDate: { lastModified: true } });
}
module.exports.updateUser = updateUser;




function getGuild(guildID){
    var guild = guildDB.findOne({guildID: guildID});
    if(guild)return guild;
    if(!guild) createGuild(guildID);
    return guildDB.findOne({guildID: guildID});
}
module.exports.getGuild = getGuild;
function createGuild(guildID){
    if(getGuild(guildID)) return;
    return guildDB.insertOne({userID: guildID});
}
module.exports.createGuild = createGuild;
function updateUser(guildID, status){
    if(!guildID || !status)
    if(guildID.constructor !== String)return;
    if(!getUser(guildID)) createGuild(guildID);

    guildDB.updateOne({guildID: guildID}, { $set: status,
 $currentDate: { lastModified: true } });
}
module.exports.updateGuild = updateGuild;
  });
})()