module.exports = async (channel) => {
	try {
		if(!channel.guild) return
		const guildDB = await global.db
			.collection('guilds')
			.getDoc({ docID: channel.guild.id });

			if (guildDB.welcomeChannel && welcomeChannel === channel.id) {
				await global.db
					.collection('guilds')
					.updateDoc({docID: channel.guild.id}, { $set: { welcomeChannel: null } });
			}
			if (guildDB.goodbyeChannel && guildDB.goodbyeChannel === channel.id) {
				await global.db
					.collection('guilds')
					.updateDoc({docID: channel.guild.id}, { $set: { goodbyeChannel: null } });
			}

	} catch (e) {
		console.error(e);
	}
};
