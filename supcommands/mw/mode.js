const supports = require("./platform.json");
const modes = require(require("path").join(process.cwd(), "assets/gamemodes.json"));
module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	run: async i => {

		if (!i.argv.player)
			return i.message.channel.send(
				"Looks like you're searching for John Cena. Add `--player=<gamertag>` or `-player <gamertag>` to look fo their stats."
			);
		if (!i.argv.platform)
			return i.message.channel.send(
				"You haven't specified a platform to look for the player. Add `--platform=<platform>` or `-platform <platform>`."
			);

		var platform = supports[i.argv.platform];
		if (!platform)
			return i.message.channel.send(
				"Platform doesn't exist or isn't supported yet. Try again."
			);

		return codAPI.MWstats(i.argv.player, platform).then(o => {
			if (typeof o === 'string') return i.message.channel.send('Message: ' + i);
			var embed = new Discord.MessageEmbed()
				.setColor(i.colors.BG_COLOR)
				.setAuthor(
					'Call of Duty: Modern Warfare',
					'https://i.imgur.com/HMU8AmJ.png'
				)
				.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
				.setTitle(o.username)
				.setFooter(
					i.getRandomFunfact(),
					client.user.displayAvatarURL({ format: 'png', dynamic: true })
				);
var k = 6;
			var fields = [];
			var gamemodeStats = o.lifetime.mode
			
			
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
				
				embed = embed.setTitle(`${modes[mode] || mode} stats for ${o.username}`);
				_.each(gamemodeStats[mode].properties, (value, key) => {
					return fields.push({ name: key, value: value, inline: true });
				})
			} else {
k = 4;
				_.each(o.lifetime.mode, (value, key) => {
					switch (key.toLowerCase()) {
						case "kills":
							return fields.push({ name: 'Kills', value: `${value} kills`, inline: true });
						case "deaths":
							return fields.push({ name: 'Deaths', value: `${value} deaths`, inline: true });
						case "score":
							return fields.push({name: "Score", value: `${value}`, inline: true});
						case "timePlayed":
							return fields.push({name: "Time played", value: `${value}`, inline: true});
						case "scorePerMinute":
							
							default:
							return fields.push({ name: `${modes[key] || key}`, value: i.trim(`**Kills**: ${value.properties.kills} kills\n**Deaths**: ${value.properties.deaths} deaths\n**Score**: ${value.properties.score} scores\n**KD**: ${value.properties.kdRatio}\n**SPM**: ${value.properties.scorePerMinute} scores/min`, 1024), inline: true });
					}

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
		});
	}
};
