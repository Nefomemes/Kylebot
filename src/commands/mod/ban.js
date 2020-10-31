module.exports = {
	perms: 4,
	category: "mod",
	run: async (i) => {
	if(!i.argv.m) return i.message.channel.send("Add the `m` option with the target you want to 🅱an.`");
	if(!i.argv.r) return i.message.channel.send("Add the `r ` option with the reason of you banning the target.");
var id;
	const user = await i.getMemberFromMention(i.argv.m, i.message.guild.members);
	if(user && !user.deleted){
	 
	if (!user.bannable) return i.message.channel.send("Ugh, I'm unable to ban this guy. Try to give me the **Ban Members** permission or higher my role a little bit higher than target.");
	if (i.message.author.id !== i.message.guild.ownerID && i.message.member.roles.highest.position <= user.roles.highest.position) return i.message.channel.send("Sorry, sir. Target have the same or even a higher highest role position than you. Try reporting target to someone whose highest role is higher than them, yeah.");
		if (!user.user.bot) {
	const guildDB = await db.collection("guilds").getDoc({ docID: imports.message.guild.id });
	var embed = new Discord.MessageEmbed()
		.setColor(color.BG_COLOR)
		.setTitle(`Banned from ${i.message.guild.name}`)
		.setDescription(`You have been :b:anned by ${i.message.author.username}#${i.message.author.discriminator} (${i.message.member.displayName}) from ${i.message.guild.name} for "${i.argv.r || "none"}".`)
		.setAuthor(i.message.author.username, i.message.author.displayAvatarURL({ format: "png", dynamic: true}))
		.setThumbnail(i.message.guild.iconURL({ format: "png", dynamic: true }))
		.setFooter(i.getFooter(), client.user.displayAvatarURL({format: "png", dynamic: true}))
		.setTimestamp()
		.setThumbnail(i.message.guild.iconURL({format: "png", dynamic: "true"}))
		.addFields(
			{
				"name": "Issued by",
				"value": `${i.message.author.username}#${i.message.author.discriminator} (${i.message.member.displayName}). ID: ${i.message.author.id}`,
				"inline": true
			},
			{
				"name": "Issued to",
				"value": `${user.user.username}#${user.user.discriminator} (${user.displayName}). ID: ${user.user.id}`,
				"inline": true
			},
			{
				"name": "Reason",
				"value": `${i.argv.r || "none"}`,
				"inline": true
			},
			{
				"name": "Server",
				"value": `${i.message.guild.name} (ID: ${i.message.guild.id})`,
				"inline": true
			},
			{
				"name": "Date",
				"value": `${new Date(Date.now()).toUTCString()} (${Date.now()})`,
				"inline": true
			},
			{
				"name": "Action",
				"value": ":b:an",
				"inline": true
			}
		)

	if (guildDB.appealLink) {
		embed = embed.addField("‎", `[Appeal Action](${guildDB.appealLink})`, true)
	}

		user.user.send(embed).catch(e => e);
	}
	id = user.user.id;
	} else {
	id = i.argv.m;	
	}
	try {
var banmember = await i.message.guild.fetchBan(id);
	if(banmember) return i.message.channel.send(`${banmember.user.username}#${banmember.user.discriminator} (${banmember.user.id}) have already been banned for "${banmember.reason}".`);
	} catch {}
var days = parseInt(i.argv.d);
if(Number.isNaN(days)){
	days = 0;
}
if(days > 7 || days < 0) return i.message.channel.send("You can only purge their messages from zero to seven days.");
 i.message.guild.members.ban(id, {days: days , reason: `Reason: ${i.argv.reason || "none"} ModID: ${i.message.author.id} ModUsername: ${i.message.author.username}#${i.message.author.discriminator}`}).then(m => message.channel.send(`Banned ${m.username || m.id || user} from ${m.message.guild.name}`)).catch(o => i.message.channel.send("Unable to ban the user. Perhaps the user doesn't exist."));
} 
}

