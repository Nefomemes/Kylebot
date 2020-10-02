module.exports = {
	desc: "Get killstreak usage stats",
	run: async i => {
				if (!i.args.length)
			return i.message.channel.send('Invalid syntax, try again.');

		var args = require('minimist')(i.args);

		if (!args.player)
			return i.message.channel.send(
				"Looks like you're searching for John Cena. Add `--player=<gamertag>` or `-player <gamertag>` to look fo their stats."
			);
		if (!args.platform)
			return i.message.channel.send(
				"You haven't specified a platform to look for the player. Add `--platform=<platform>` or `-platform <platform>`."
			);

		const supports = {
			activision: 'uno',
			acti: 'uno',
			psn: 'psn',
			xbl: 'xbl',
			battle: 'battle',
			pc: 'battle',
			ps4: 'psn',
			ps5: 'psn',
			xbox: 'xbl',
			ps: 'psn',
			uno: 'uno'
		};
		var platform = supports[args.platform];
		if (!platform)
			return i.message.channel.send(
				"Platform doesn't exist or isn't supported yet. Try again."
			);
		
		return codAPI.MWstats(args.player, platform).then(o => {
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
				
			var killstreak = 
			
		})
		
	}
}