
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
    return new Promise( async (resolve, reject) => {
        try {
        (async function() {
        var user = await db.collection("users").findOne({userID: userID});

        if(!user) {
            await db.collection("users").insertOne({userID: userID})
            resolve( await db.collection("users").findOne({userID: userID}))
        } else {
            resolve(user)
        } 
        })()
        }catch(e){
            reject(e);
        }
    })
}

function updateUser(userID,status){
    return new Promise( async (resolve, reject) => {
        try {
            (async function(){
            await getUser(userID);
            await db.collection("users").updateOne({userID: userID}, { $set: status,
 $currentDate: { lastModified: true } })
 resolve(await getUser(userID));
  })()
        }catch(e){
            reject(e);
        }
    })
}
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;


  });
})()