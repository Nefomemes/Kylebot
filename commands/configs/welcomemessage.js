module.exports.run = async (imports) => {
if(!imports.args.length)return imports.message.react("❌");
var content = imports.trim(imports.args.join(" "), 128);
if(imports.args[0].toLowerCase() === "--none") content = null;
await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {welcomeMessage: content}});
imports.message.react("✅");
}
module.exports.perms = 7;