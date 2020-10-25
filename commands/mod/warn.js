module.exports = {
	desc: "Warn a user",
	perms: 3,
	run: async (i) => {
		if(!i.argv.dri || i.argv.dri !== true) return i.message.channel.send("For the time being, the `dri` (\"don't record infraction\") option is required.");

		if(!i.argv.r) return i.message.channel.send("Please add the `r` option with the reason you are warning the user.")
		if(!i.argv.m) return i.message.channel.send("Please add the `m` option with the member you want to warn.");
		const member = await i.getMemberFromMention(i.argv.m, i.message.guild.members);

	

		if(!member) return i.message.channel.send("Invalid user.");
		var silent = false;
	if(i.argv.s && i.argv.s === true || member.user.bot){
		silent = true;
	}
	var user = member;
				if(i.argv.dri && i.argv.dri === true && silent) return i.message.channel.send("DRI mode can not be turned on if the `s` (silent) option is turned on.");
				if(!silent){ 
		var embed = new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setTitle(`Warned from ${i.message.guild.name}`)
			.setAuthor(i.message.author.username, i.message.author.displayAvatarURL({ format: "png", dynamic: true}))
			.setDescription(i.trim(`You have been warned by ${i.message.author.username}#${i.message.author.discriminator} (${i.message.author.id}) from ${i.message.guild.name} (${i.message.guild.id}) for "${i.argv.r}".`, 2048))
			.setFooter(i.getRandomFunfact(), client.user.displayAvatarURL({format: "png", dynamic: true}))
			.setTimestamp()
			.setThumbnail(i.message.guild.iconURL({dynamic: true, format: "png"}))
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
				"value": "warn",
				"inline": true
			}
			);
				member.user.send(embed).catch(o => i.message.channel.send("Unable to send the warning to the user. I got blocked or their DM was closed.f"));

				}

			return i.message.channel.send(`${i.message.author} have warned ${member} for "${i.argv.r}".`);	
/*
	if(!i.argv.dri || i.argv.dri !== true){
		db.collection("gmembers").updateDoc({docID: member.user.id, guildID: member.guild.id}, )
	} 
*/
	}
}
module.exports.category = "mod";