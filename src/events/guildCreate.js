module.exports = async guild => {
	try {
		const user = await global.client.users.fetch(guild.ownerID);
	
			const userDB = await global.db.collection("users").getDoc({docID: user.id});
			const embed = await new global.Discord.MessageEmbed()
				.setColor(global.colors.BG_COLOR)
				.setAuthor(
					user.username,
					user.displayAvatarURL({ format: 'png', dynamic: true })
				)
				.setTitle(`${guild.name} invited the bot`)
				.setThumbnail(
					global.built_ins.getItem('emblem', userDB.emblem).assets[0].asset
				)
				.setImage(
					global.built_ins.getItem('playercard', userDB.playercard).assets[0]
						.asset
				)
				.setTimestamp()
				.setFooter(
					`Prefix: ${
						global.configs.prefix
					} | ${global.built_ins.getRandomFunfact()}`
				);
	(await global.client.channels.fetch('730374154569646091')).send(embed);
		
	} catch (e) {
	    console.error(e);
	    
	}
};
