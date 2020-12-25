const mwstarter = require("../mwstarter");

module.exports = {
	desc: 'Get killstreak usage stats',
	argvOptions: {
		u: [ "user" ],
		s: [ "platform" ],
		m: [ "mode" ]
	},
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md#prefixmw-killstreak-options-",
	run: async (i) => mwstarter(i, async (i) => {

		
		var embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setAuthor(
				'Call of Duty™: Modern Warfare™',
				'https://i.imgur.com/HMU8AmJ.png'
			)
			.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
			.setTitle(i.player.username)
			.setFooter(
				i.getRandomFunfact(),
				client.user.displayAvatarURL({ format: 'png', dynamic: true })
			);
		var fields = [];

		var k = (value, key) => {
			let item = i.getItem('killstreak', key);

			embed = embed.addField((function () {
					if (item) return item.name || item.id || key;
					return key;
				})(),
				`Uses: ${value.properties.uses}`,
				 true
			);

		};
		_.forEach(
			i.player.lifetime.scorestreakData.lethalScorestreakData,
			k);
		_.forEach(i.player.lifetime.scorestreakData.supportScorestreakData, k);
embed = i.embedPagify(embed,
{
	length: i.argv.l,
	page: i.argv.p
})
		return i.message.channel.send(embed);


	})
}