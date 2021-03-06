
const supports = require("./platform.json");
const branch = require("./branch.json");
const parsestats = require("../parsestats");
const modes = require("./gamemodes.json");
module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	run: async i => {
		
		if (!i.argv.player) return i.message.channel.send(
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
					i.getFooter(),
					client.user.displayAvatarURL({ format: 'png', dynamic: true })
				);
				var k = 2;
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
				_.each(gamemodeStats[mode], (value, key) => parsestats(value, key, fields))
				k = 9;
			} else {
				_.each(gamemodeStats, (value, key) => fields.push({name: modes[key] || key, value: 
			   `**Kills**: ${value.kills} kills
				**Deaths**: ${value.deaths} deaths
				**Wallbangs**: ${value.wallBangs} times
				**Assists**: ${value.assists} times
				**Headshots**: ${value.headshots} times
				**Matches played**: ${value.matchesPlayed} matches`, inline: true}));
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
						i.trim(`${field.value}`, 1024),
						field.inline
					);
				}
			}
			return i.message.channel.send(embed);
		});
	}
};
