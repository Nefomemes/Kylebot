const { dbClient } = require("./db");
const db = dbClient.db("bot");
const userDB = db.collection("users");
const getUser = async (userID) => {
    return userDB.findOne({userID: userID});

}
const createUser = async (userID) => {
    if(getUser(userID)){
        throw new Error("User already logged.").name = "DatabaseError";
        return;
    } 
   return userDB.insertOne(
        {userID: userID}
    )
}
const updateUser = async (userID, status) => {
    let user = getUser(userID);
    if(!user){
        user = createUser(userID);
    }
    return userDB.updateOne({userID: userID}, {...status, $currentDate: {lastModified: true}});
}

  