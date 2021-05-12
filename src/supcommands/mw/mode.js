const mwstarter = require("../mwstarter");
const parsestats = require("../parsestats");

const modes = require("./gamemodes.json");
module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md#prefixmw-mode-option-",
	run: async (i) => mwstarter(i, async (i) => {


		var embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
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
var k = 6;
		var fields = [];
		var gamemodeStats = i.player.lifetime.mode
		
		
		if (i.argv.mode) {
			var mode;
			if (modes[i.argv.mode] || gamemodeStats[i.argv.mode]) {
				mode = i.argv.mode
				   } else {
			 
				let foobar = [];
				for (const [key, value] of Object.entries(modes)) {
					if(value.toLowerCase() === i.argv.mode.toLowerCase() || value.toLowerCase().split(i.argv.mode.toLowerCase())[1]){
						foobar.push({ key: key, value: value });
					}

				}
		
				if (!foobar.length) return i.message.channel.send("There are no gamemodes with that name or id.");
				mode = foobar[0].key;
				
			}
			if (!gamemodeStats[mode]) return i.message.channel.send("There are no gamemodes with that name or id.");
			
			embed = embed.setTitle(`${modes[mode] || mode} stats for ${i.player.username}`);
			_.each(gamemodeStats[mode].properties, (value, key) => parsestats(value, key, fields))
		} else {

			_.each(i.player.lifetime.mode, (value, key) => fields.push({ name: `${modes[key] || key}`, value: i.trim(
		   `**Kills**: ${value.properties.kills} kills
			**Deaths**: ${value.properties.deaths} deaths
			**Score**: ${value.properties.score} scores`, 1024), inline: true }));
		}
		let number = parseInt(i.argv.page);
		if (Number.isNaN(number) || !number) {
			number = 1;
		}
		let page = i.getPage(fields, k, number);
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
};
