module.exports.run = async (imports) => {
    if(!imports.args.length)return imports.message.react(":x:")
const channelName = imports.args.shift().toLowerCase();
const channel = imports.getChannelFromMention(channelName);
var id;
if(!channel){
    if(channelName === "none"){
        id = null;
    } else {
    return imports.message.react(":x:");
    }
} else if(channel){
    id = channel.id;
}

await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {welcomeChannel: id}});
imports.message.react("✅");
};
module.exports.perms = 7;