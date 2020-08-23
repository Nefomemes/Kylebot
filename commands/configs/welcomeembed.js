module.exports.run = async (imports) => {
if(!imports.args.length)return imports.message.react(":x:");
    var toggle;
    switch(imports.args.shift().toLowerCase()){
        case "on":
            toggle = true;
            break;
        case "off":
            toggle = false;
            break;
        default:
            return imports.message.react(":x:");
    }
await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {welcomeEmbed: toggle}});
imports.message.react("✅");
}
module.exports.perms = 7;