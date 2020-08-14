module.exports.run = (imports) => {
    if(!imports.args.length)return imports.message.react("❌")

    var mode = imports.args.shift().toLowerCase()
if(!imports.args.length) return imports.message.react("❌")
    const desc = imports.trim(imports.args.join(" "), 128)
    
if(mode === "--user" || mode === "--me"){
        imports.db.updateDoc('users', imports.message.author.id, {$set: {desc: desc}});
} else if((mode === "--server" || mode === "--guild") && imports.message.guild){
            if(!imports.message.member.hasPermission('MANAGE_GUILD'))return imports.message.channel.send("Missing permission!");
        imports.db.updateDoc('guilds', imports.message.guild.id, {$set: {desc: desc}});
        } else {   return imports.message.react("❌")}
        return imports.message.react("✔")
}
