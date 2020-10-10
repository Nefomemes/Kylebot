var modes = require(require("path").join(process.cwd(), "assets/gamemodes.json"));
const supports = require("./platform.json");
const branch = require("./branch.json")
modes.all = "All";
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
		
		if(!i.argv.branch) return i.message.channel.send("Add `--branch=<branch>` to specify the branch. For example `--branch=warzone` or `--branch=mp`");
			
		i.argv.branch = branch[i.argv.branch.toLowerCase()];
		if(!i.argv.branch) return i.message.channel.send("That wasn't a valid branch.");
		var combat;
		
		switch(i.argv.branch){
			case "wz":
				combat = codAPI.MWcombatwz;
				break;
			case "mp":
				combat = codAPI.MWcombatmp;
				break;
			default:
				return i.message.channel.send("Something happened.");
		}
		 

		return combat(i.argv.player, platform).then(o => {
			if (typeof o === 'string') return i.message.channel.send('Message: ' + i);
			var embed = new Discord.MessageEmbed()
				.setColor(i.colors.BG_COLOR)
				.setAuthor(
					'Call of Duty: Modern Warfare',
					'https://i.imgur.com/HMU8AmJ.png'
				)
				.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
				.setFooter(
					i.getRandomFunfact(),
					client.user.displayAvatarURL({ format: 'png', dynamic: true })
				);
var fields = [];
				var gamemodeStats = o.summary
			if(i.argv.mode){
				var mode = i.argv.mode;
                if (gamemodeStats[i.argv.mode]) {
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
				embed = embed.setTitle(`${modes[mode]} combat statistics`);
				_.each(gamemodeStats[mode], (value, key) => {
					return fields.push({name: key, value: value, inline: true});
				})
			} else {
				_.each(gamemodeStats, (value, key) => {
					fields.push({name: modes[key] || key, value: `**Kills**: ${value.kills} kills\n**Deaths**: ${value.deaths} deaths\n**Wallbangs**:${value.wallBangs}\n**Assists**\n**Headshots**:${value.headshots}\n**Mathes played**:${value.matchesPlayed} matches\n**Win-loss ratio**: ${value.wlRatio}\n**SPM**: ${value.scorePerMinute}\n**KD Ratio**:${value.kdRatio}\n**Executions**:${value.executions}\n**Kills per game**: ${value.killsPerGame}\n**Damage done**:${value.damageDone}\n**Damage taken**:${value.damageTaken}`, inline: true})
				})
			} 
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
						i.trim(`${field.value}`, 1024),
						field.inline
					);
				}
			}
			return i.message.channel.send(embed);
		});
	}
};
