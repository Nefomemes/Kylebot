
const supports = require("./platform.json");
const branch = require("./branch.json");

const modes = require("./gamemodes.json");
module.exports = {
	desc: 'Get the information of a Call of Duty: Modern Warfare player.',
	argvOptions: {
		u: [ "user" ],
		s: [ "platform" ],
		m: [ "mode" ]
	},
	run: i => mwstarter(i, async i => {
		return;
			if(typeof o === 'string') return i.message.channel.send('Message: ' + i);
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
			embed = i.embedPagify(embed)
			return i.message.channel.send(embed);
	
	})
};
