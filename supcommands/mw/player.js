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
		var platform = supports[i.argv.platform];
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

			var fields = [
				{ name: 'Username', value: o.username, inline: true },
				{
					name: 'Platform',
					value: (function() {
						switch ((o.platform || 'unknown').toLowerCase()) {
							case 'xbl':
								return 'XBOX';
							case 'psn':
								return 'PlayStation Network';
							case 'battle':
								return 'Blizzard Battle.net';
							default:
								return 'unknown';
						}
					})(),
					inline: true
				},
				{ name: 'Rank', value: `Rank ${o.level}`, inline: true },
				{
					name: 'Total Xp',
					value: `${o.totalXp} xp`,
					inline: true
				},
				{
					name: 'Wins',
					value: `${o.lifetime.all.properties.wins} wins`,
					inline: true
				},
				{
					name: 'Losses',
					value: `${o.lifetime.all.properties.losses} losses`,
					inline: true
				},
				{
					name: 'Ties',
					value: `${o.lifetime.all.properties.ties} ties`,
					inline: true
				},
				{
					name: 'Win-lost ratio',
					value: `${o.lifetime.all.properties.winLossRatio}`,
					inline: true
				},
				{
					name: 'Kills',
					value: `${o.lifetime.all.properties.kills} kills`,
					inline: true
				},
				{
					name: 'Deaths',
					value: `${o.lifetime.all.properties.deaths} deaths`,
					inline: true
				},
				{
					name: 'Suicides (suicide is bad, kids)',
					value: `${o.lifetime.all.properties.suicides} suicides`,
					inline: true
				},
				{
					name: 'Kill-death ratio',
					value: `${o.lifetime.all.properties.kdRatio}`,
					inline: true
				},
				{
					name: 'Total scores',
					value: `${o.lifetime.all.properties.score}`,
					inline: true
				},

				{
					name: 'Accuraccy',
					value: `${o.lifetime.all.properties.accuracy}`,
					inline: true
				},
				{
					name: `Games played`,
					value: `${o.lifetime.all.properties.gamesPlayed} games`,
					inline: true
				},
				{
					name: 'Headshots',
					value: `${o.lifetime.all.properties.headshots} headshots`,
					inline: true
				},

				{
					name: 'Score per minute',
					value: `${o.lifetime.all.properties.scorePerMinute}`,
					inline: true
				},
				{
					name: `Score per game`,
					value: `${o.lifetime.all.properties.scorePerGame}`,
					inline: true
				}
			];

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
		});
	}
};
