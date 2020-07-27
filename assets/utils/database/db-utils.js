
(async function(){const {MongoClient} = require("mongodb");
const assert = require("assert");

const url = process.env.DB;

    
MongoClient.connect(url, function(err, dbClient) {
    assert.equal(null, err);
    
    db = dbClient.db("bot")
    module.exports.dbClient = dbClient;
    const userDB = db.collection("users");
async function sghrug(userID){
    return userDB.findOne({userID: userID});

}
async function getUser(userID){
    let result = await sghrug(userID).then(userrrrr =>  userrrrr);
    if(result) return result;
    if(!result)return createUser(userID);
}
module.exports.getUser = getUser;
async function createUser(userID) {
    if(getUser(userID).then(result => result))return getUser(userID).then(result => result);
    return userDB.insertOne(
        {userID: userID}
    ).then(result => result);
}
module.exports.createUser = createUser;
async function updateUser(userID, status) {
    let user = getUser(userID);
    if(!user){
        user = createUser(userID);
    }
    return userDB.updateOne({userID: userID}, {...status, $currentDate: {lastModified: true}});
}
module.exports.updateUser = updateUser;

  });





})()