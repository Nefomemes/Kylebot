const mwstarter = require("../mwstarter");

module.exports = {
	desc: 'Get killstreak usage stats',
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md#prefixmw-killstreak-options-",
	run: async (i) => mwstarter(i, async (i) => {

		
		var embed = new Discord.MessageEmbed()
			.setColor(i.colors.BG_COLOR)
			.setAuthor(
				'Call of Duty: Modern Warfare',
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

			fields.push({
				name: (function () {
					if (item) return item.name || item.id || key;
					return key;
				})(),
				value: `Uses: ${value.properties.uses}`,
				inline: true
			});

		};
		_.forEach(
			i.player.lifetime.scorestreakData.lethalScorestreakData,
			k);
		_.forEach(i.player.lifetime.scorestreakData.supportScorestreakData, k);

		let number = parseInt(i.argv.page);
		if (Number.isNaN(number) || !number) {
			number = 1;
		}
		let page = i.getPage(fields, 6, number);
		embed = embed.setFooter(
			i.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048)
		);
		for (let field of fields) {
			let index = fields.indexOf(field);
			if (!(index > page.end || index < page.start)) {
				embed = embed.addField(
					`${field.name}`,
					`${field.value}`,
					field.inline
				);
			}
		}
		return i.message.channel.send(embed);


	})
}