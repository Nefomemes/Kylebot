module.exports = {
	perms: 3,
	run: async (i) => {
	if(!i.argv.member) return i.message.channel.send("Add `--member=<member>` to choose the target you want to kick.`");
	if(!i.argv.reason) return i.message.channel.send("Add `--reason=<reason>` to write the reason of you kick the target.");

	const user = await i.getMemberFromMention(i.argv.member, i.message.guild.members);
	if (!user) return i.message.channel.send("Target doesn't exist or invalid, sir.");
	if (user.deleted) return i.message.channel.send("Target is no longer a member of this server.");
	if (!user.bannable) return i.message.channel.send("Ugh, I'm unable to kick this guy. Try to give me the **Kick Members** permission or higher my role a little bit higher than target.");
	if (i.message.author.id !== i.message.guild.ownerID && i.message.member.roles.highest.position <= user.roles.highest.position) return i.message.channel.send("Sorry, sir. Target have the same or even a higher highest role position than you. Try reporting target to someone whose highest role is higher than them, yeah.");
		if (!user.user.bot) {
	
	var embed = new Discord.MessageEmbed()
		.setColor(color.BG_COLOR)
		.setTitle(`Kicked from ${i.message.guild.name}`)
		.setDescription(`You have been kicked by ${i.message.author.username}#${i.message.author.discriminator} (${i.message.member.displayName}) from ${i.message.guild.name} for "${i.args.join(" ") || "none"}".`)
		.setAuthor(i.message.author.displayAvatarURL({ format: "png", dynamic: true}), i.message.author.username)
		.setThumbnail(i.message.guild.iconURL({ format: "png", dynamic: true }))
		.setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`)
		.setTimestamp()
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
				"value": `${i.argv.reason || "none"}`,
				"inline": true
			},
			{
				"name": "Server",
				"value": `${imports.message.guild.name} (ID: ${imports.message.guild.id})`,
				"inline": true
			},
			{
				"name": "Date",
				"value": `${new Date(Date.now()).toUTCString()} (${Date.now()})`,
				"inline": true
			},
			{
				"name": "Action",
				"value": "kick",
				"inline": true
			}
		)



		user.user.send(embed).catch(e => e);
	}
	await user.kick(`Reason: ${i.argv.reason || "none"} ModID: ${i.message.author.id} ModUsername: ${i.message.author.username}#${imports.message.author.discriminator}`);
	return i.message.channel.send("Nicely done. Ez pz.");


}
}

