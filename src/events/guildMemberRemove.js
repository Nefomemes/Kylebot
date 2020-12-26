

module.exports = async (member) => {
	try {
		const guildDB = await db.collection("guilds").getDoc({ docID: member.guild.id });
		if (guildDB.goodbyeChannel && guildDB.goodbyeMessage) {
			const channel = await client.channels.cache.get(guildDB.goodbyeChannel);
			if (channel) {
				channel.send(built_ins.trim(`*The content of this message is managed by an end user. We do not take responsibility of any content in this message.*\n\n${guildDB.goodbyeMessage.split("{member}").join(`${member}`).split("{count}").join(`${member.guild.memberCount}`).split("{username}").join(`${member.user.username}`).split("{discriminator}").join(`${member.user.discriminator}`).split("{displayName}").join(`${member.displayName}`)}`, 2000))
		}
		}
	} catch (e) {
		console.error(e);
	}
}