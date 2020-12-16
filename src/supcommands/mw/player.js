const mwstarter = require("../mwstarter");

module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md",
	run: async (i) => mwstarter(i, async i => {
		

		if (typeof o === 'string') return i.message.channel.send('Message: ' + i);
		var embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setAuthor(
				'Call of Duty™: Modern Warfare™',
				'https://i.imgur.com/HMU8AmJ.png'
			)
			.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
			.setTitle(o.username)
			.setFooter(
				i.getRandomFunfact(),
				client.user.displayAvatarURL({ format: 'png', dynamic: true })
			).setDescription(
			`**Username**: ${o.username}
			 **Platform**: ${ (function() {
					switch ((o.platform || 'unknown').toLowerCase()) {
						case 'xbl':
							return 'XBOX';
						case 'psn':
							return 'PlayStation Network';
						case 'battle':
							return 'Blizzard Battle.net';
						default:
							return 'unknown';
					}
				})()}
			 **Rank**: Rank ${o.level}
			 **Total xp**: ${o.totalXp}
			 **Wins**: ${o.lifetime.all.properties}
			 **Losses**: ${o.lifetime.all.properties.losses}
			 **Ties**: ${o.lifetime.all.properties.ties}
			 **WL Ratio**: ${o.lifetime.all.properties.winLossRatio}
			 **Kills**: ${o.lifetime.all.properties.kills}
			 **Deaths**: ${o.lifetime.all.properties.deaths}
			 **KD Ratio**: ${o.lifetime.all.properties.kdRatio}
			 **Headshots**: ${o.lifetime.all.properties.headshots}
			 **Accuraccy**: ${o.lifetime.all.properties.accuracy}
			 **Total score**: ${o.lifetime.all.properties.score}
			 **Matches played**: ${o.lifetime.all.properties.gamesPlayed}
			 **Score per minute**: ${o.lifetime.all.properties.scorePerMinute}
			 **Score per game**: ${o.lifetime.all.properties.scorePerGame}
			`);

		

		return i.message.channel.send(embed);

})
};
