const mwstarter = require("../mwstarter");

module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md",
	argvOptions: {
		u: [ "user" ],
		s: [ "platform" ],
		m: [ "mode" ]
	},
	run: async (i) => mwstarter(i, async i => {
		let o = i.player;

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
			`**Username**: ${o.username}\n**Platform**: ${ (function() {
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
				})()}\n**Rank**: Rank ${o.level}\n**Total xp**: ${o.totalXp}\n**Wins**: ${o.lifetime.all.properties.wins}\n**Losses**: ${o.lifetime.all.properties.losses}\n**Ties**: ${o.lifetime.all.properties.ties}\n**WL Ratio**: ${o.lifetime.all.properties.winLossRatio}\n**Kills**: ${o.lifetime.all.properties.kills}\n**Deaths**: ${o.lifetime.all.properties.deaths}\n**KD Ratio**: ${o.lifetime.all.properties.kdRatio}\n**Headshots**: ${o.lifetime.all.properties.headshots}\n**Accuraccy**: ${o.lifetime.all.properties.accuracy}\n**Total score**: ${o.lifetime.all.properties.score}\n**Matches played**: ${o.lifetime.all.properties.gamesPlayed}\n**Score per minute**: ${o.lifetime.all.properties.scorePerMinute}\n**Score per game**: ${o.lifetime.all.properties.scorePerGame}
			`);

		

		return i.message.channel.send(embed);

})
};
