module.exports.run = async (imports) => {
    var channel = await imports.getChannelFromMention(imports.args[0], imports.message.guild.channels);
    var slowmode;
var e = false;
if(!channel) {
channel = await imports.getChannelFromMention(imports.args[1], imports.message.guild.channels);
} else { e = true; }
if(!channel)return imports.message.channel.send("Invalid channel, sir.");
if(channel.type !== "text") return imports.message.channel.send("Slowmode only works in text channels.");
if(!channel.permissionsFor(imports.message.author.id).has("MANGE_CHANNELS")) return imports.message.channel.send("You need to be able to manage this channel before proceeding, sir.");
 if(e){
    if(imports.args[1] && !Number.isNaN(parseInt(imports.args[1]))){
    slowmode = parseInt(imports.args[1]);
    } 
} else {
    if(imports.args[0] && !Number.isNaN(parseInt(imports.args[0]))){
        slowmode = parseInt(imports.args[0]);
    }
}
if(!slowmode) return imports.message.channel.send("A number-typed argument must be provided. Try again, yeah.");
if(slowmode > (6 * 3600000))return imports.message.channel.send("Slowmode may not be longer than 6 hours (3600000 miliseconds). Try again, yeah.");
imports.args.shift();
imports.args.shift();
await channel.setRateLimitPerUser(slowmode, `Reason: ${imports.args.join(" ") || "unknown" } AdminID: ${imports.message.author.id} AdminUsername: ${imports.message.author.username}#${imports.message.author.discriminator}`);
return imports.message.channel.send("Nicely done. Ez pz.");
}
module.exports.av = "guild";