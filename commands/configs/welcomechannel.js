module.exports.run = async (imports) => {
    if(!imports.args.length)return imports.message.react("❌")
const channelName = imports.args.shift().toLowerCase();
const channel = imports.getChannelFromMention(channelName, imports.message);
var id;
if(!channel){
    if(channelName === "none"){
        id = null;
    } else {
        imports.message.channel.send("Invalid channel.");
    return imports.message.react("❌");
    }
} else if(channel){
    id = channel.id;
}

await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {welcomeChannel: id}});
imports.message.react("✅");
};
module.exports.perms = 7;