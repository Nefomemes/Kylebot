const gamemodes = require("./gamemodes.json");
const mwstarter = require("../mwstarter");
function parseStats(value) {
	return `**Kills**: ${value.kills} kills\n**Downs**: ${value.downs}\n**Deaths**: ${value.deaths} deaths\n**Wins**: ${value.wins} wins\n**Fifth positions**: ${value.topFive}\n**Tenth positions**: ${value.topTen}\n**25th positions**: ${value.topTwentyFive}\n**Revives**: ${value.revives} revives\n**Contracts**: ${value.contracts} contracts\n**Matches played**: ${value.gamesPlayed} matches\n**Score per minute**: ${value.scorePerMinute}\n**Cash**: $${value.cash}`
}
module.exports = {
	desc: "Display your Warzone stats.",
	argvOptions: {
		u: [ "user" ],
		s: [ "platform" ],
		m: [ "mode" ]
	},
	run: async (i) => mwstarter(i, async (i) => {
		const res = await codAPI.MWBattleData(i.player.username, i.player.platform);
		
		var embed = new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setTitle(`Warzone stats for ${i.player.username}`)
		.setAuthor("Call of Duty™: Modern Warfare™", 'https://i.imgur.com/HMU8AmJ.png')
		.setThumbnail('https://i.imgur.com/HMU8AmJ.png')
		.setFooter(i.getFooter(),
		client.user.displayAvatarURL({format: "png", dynamic: true}))
		.setTimestamp()
		var k = 6;
		var fields = [];
		if (i.argv.m) {
			var mode;
			if (gamemodes[i.argv.m] || res[i.argv.m]) {
				mode = i.argv.m
				   } else {
			 
				let foobar = [];
				for (const [key, value] of Object.entries(gamemodes)) {
					if(value.toLowerCase() === i.argv.m.toLowerCase() || value.toLowerCase().split(i.argv.m.toLowerCase())[1]){
						foobar.push({ key: key, value: value });
					}

				}
		
				if (!foobar.length) return i.message.channel.send("There are no gamemodes with that name or id.");
				mode = foobar[0].key;
				
			}
			if (!res[mode]) return i.message.channel.send("There are no gamemodes with that name or id.");
			
			embed = embed.setTitle(`${gamemodes[mode] || mode} stats for ${i.player.username}`);
			
			embed.setDescription(parseStats(res[mode]));
		
		} else {
			k = 4;
			_.each(res, (value, key) => 
				embed.addField(  gamemodes[key] || key, 	parseStats(value), true)
				)
		}

	embed = i.embedPagify(embed, {
		page: i.argv.p,
		length: i.argv.l
	})
		
		return i.message.channel.send(embed)
			
	

	})
} 