module.exports.perms = 3;
module.exports.run = async (imports) => {
    if(!imports.args.length) return imports.message.channel.send("Arguments required here. Try again, yeah.");
    const user = await imports.getMemberFromMention(imports.args.shift(), imports.message.guild.members);
    if(!user) return imports.message.channel.send("Target doesn't exist or invalid, sir.");
    if(user.deleted) return imports.message.channel.send("Target is no longer a member of this server, sir.");
    if(!user.kickable) return imports.message.channel.send("Sorry, sir. I was unable to kick target. Try to give me the **Kick Members** permission or higher my role a little bit higher than target.");
    if(imports.message.author.id !== imports.message.guild.ownerID && imports.message.member.roles.highest.position <= user.roles.highest.position) return imports.message.channel.send("Sorry, sir. Target have the same or even a higher highest role position than you. Try reporting target to someone whose highest role is higher than them, yeah.");
    const guildDB = await imports.db.getDoc("guilds", imports.message.guild.id);
    var embed = new imports.Discord.MessageEmbed()
    .setColor(imports.color.BG_COLOR)
    .setTitle(`Kicked from ${imports.message.guild.name}`)
    .setDescription(`You have been kicked by ${imports.message.author.username}#${imports.message.author.discriminator} (${imports.message.member.displayName }) from ${imports.message.guild.name} for "${imports.args.join(" ") || "none"}".`)
    .setAuthor(imports.message.author.displayAvatarURL({format: "png", dynamic: true}), imports.message.author.username)
    .setThumbnail(imports.message.guild.iconURL({format: "png", dynamic: true}))
    .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`)
    .setTimestamp()
    .addFields(
        {
            "name": "Issued by",
            "value": `${imports.message.author.username}#${imports.message.author.discriminator} (${imports.message.member.displayName }). ID: ${imports.message.author.id}`,
            "inline": true
        },
        {
            "name":"Issued to",
            "value": `${user.user.username}#${user.user.discriminator} (${user.displayName}). ID: ${user.user.id}`,
            "inline": true
        },
        {
            "name":"Reason",
            "value":`${imports.args.join(" ") || "none"}`,
            "inline": true
        },
        {
            "name":"Server",
            "value":`${imports.message.guild.name} (ID: ${imports.message.guild.id})`,
            "inline": true
        },
        {
            "name":"Date",
            "value":`${Date.now().toUTCString()} (${Date.now()})`,
            "inline": true
        },
        {
            "name":"Action",
            "value":"kick",
            "inline":true
        }
    )    

    if(guildDB.appealLink){
        embed = embed.addField("‎", `[Appeal Action(you can use an invite link instead though, it's just a kick)](${guildDB.appealLink})`, true)
    }
if(!user.user.bot){
    user.user.send(embed);
}
await user.kick(`Reason: ${imports.args.join(" ") || "none"} ModID: ${imports.message.author.id} ModUsername: ${imports.message.author.username}#${imports.message.author.discriminator}`);
return imports.message.channel.send("Nicely done.")

    
}
module.exports.category = "mod";