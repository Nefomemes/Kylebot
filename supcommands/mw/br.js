const gamemodes = require("./gamemodes.json")
const mwstarter = require("../mwstarter");

module.exports = {
	desc: "Display your Warzone stats.",
	run: async (i) => mwstarter(i, async (i) => {
		const res = await codAPI.MWBattleData(i.player.username, i.player.platform);
		
		var embed = new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setTitle(`Warzone stats for ${i.player.username}`)
		.setAuthor("Call of Duty™: Modern Warfare™", 'https://i.imgur.com/HMU8AmJ.png')
		.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
		.setFooter(i.getRandomFunfact(),
		client.user.displayAvatarURL({format: "png", dynamic: true}))
		.setTimestamp()
		var k = 6;
		var fields = [];
		if (i.argv.mode) {
			var mode;
			if (gamemodes[i.argv.mode] || res[i.argv.mode]) {
				mode = i.argv.mode
				   } else {
			 
				let foobar = [];
				for (const [key, value] of Object.entries(gamemodes)) {
					if(value.toLowerCase() === i.argv.mode.toLowerCase() || value.toLowerCase().split(i.argv.mode.toLowerCase())[1]){
						foobar.push({ key: key, value: value });
					}

				}
		
				if (!foobar.length) return i.message.channel.send("There are no gamemodes with that name or id.");
				mode = foobar[0].key;
				
			}
			if (!res[mode]) return i.message.channel.send("There are no gamemodes with that name or id.");
			
			embed = embed.setTitle(`${modes[mode] || mode} stats for ${o.username}`);
			_.each(res[mode], (value, key) => parsestats(value, key, fields))
		} else {
			k = 4;
			_.each(res, (value, key) => {
				fields.push({name:  gamemodes[key] || key, value: 
					`**Kills**: ${value.kills} kills
					 **Deaths**: ${value.deaths} deaths
					 **Wins**: ${value.wins} wins
					 **Revives**: ${value.revives} revives
					 **Contracts**: ${value.contracts} contracts
					 **Matches played**: ${value.matchesPlayed} matches`})	
			})
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
} 