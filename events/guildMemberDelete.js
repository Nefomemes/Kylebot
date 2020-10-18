const { Db } = require("mongodb");

module.exports = async (member) => {
    try {
        const guildDB = await db.collection("guilds").getDoc({docID: member.guild.id});
        if(guildDB.goodbyeChannel){}
    } catch(e) {
        console.error(e);
    }
}