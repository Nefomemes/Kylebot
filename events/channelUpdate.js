module.exports = async (oldChannel, newChannel) => {
    try {

        const guildDB = await global.db.getDoc("guilds", newChannel.guild.id);
        if(newChannel.type !== "text"){
            if(guildDB.welcomeChannel && welcomeChannel === newChannel.id){
                await global.db.updateDoc("guilds", newChannel.guild.id, {$set: {welcomeChannel: null}});
            }
            if(guildDB.goodbyeChannel && guildDB.goodbyeChannel === newChannel.id){
                await global.db.updateDoc("guilds", newChannel.guild.id, {$set: {goodbyeChannel: null}});
            }
        }
    } catch(e) {
        console.error(e);
    }
}