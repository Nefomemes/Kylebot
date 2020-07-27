
(async function(){const {MongoClient} = require("mongodb");
const assert = require("assert");

const url = process.env.DB;

    
MongoClient.connect(url, function(err, dbClient) {
    assert.equal(null, err);
    
    db = dbClient.db("bot")
    const userDB = db.collection("users");
async function getUser(userID){
    return userDB.findOne({userID: userID});

}

async function createUser(userID) {
    if(getUser(userID)){
        throw new Error("User already logged.").name = "DatabaseError";
        return;
    } 
   return userDB.insertOne(
        {userID: userID}
    )
}
async function updateUser(userID, status) {
    let user = getUser(userID);
    if(!user){
        user = createUser(userID);
    }
    return userDB.updateOne({userID: userID}, {...status, $currentDate: {lastModified: true}});
}

module.exports = {
    updateUser: updateUser,
    createUser: createUser,
    getUser: getUser,
    dbClient: dbClient
}
  });





})()