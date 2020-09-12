module.exports.run = async imports => {
	var embed = new imports.Discord.MessageEmbed()
		.setColor(imports.colors.BG_COLOR)
		.setFooter(
			`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`,
			imports.client.user
				.displayAvatarURL({ format: 'png', dynamic: true })
				.setTimestamp()
				.setAuthor(
					'Powered by Steam (API provided by AlexFlipnote though)',
					'https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png',
					'https://api.alexflipnote.dev/'
				)
		);
	var fields = [];
	var query = imports.querystring.stringify({ b: imports.args.shift() || "Nefomemes" }).slice(2);
	var user;
	await imports
		.fetch(`https://api.alexflipnote.dev/steam/user/${query}`)
		.then(async res => {
			try {
				user = res.json();
			} catch {
				var $ = require('cheerio').load(await res.text());
				embed = embed.setDescription($('title').html());
			} finally {
				if (user) {
					const { profile, id, avatars } = user;
					embed = embed
						.setTitle(profile.username)
						.setURL(profile.url)
						.setDescription(profile.summary)
						.setThumbnail(avatars.avatarfull)
						.setImage(profile.background);

					fields.push(
						{ name: 'Steam ID 3', value: id.steamid3, inline: true },
						{ name: 'Steam ID 32', value: id.steamid32, inline: true },
						{ name: 'Steam ID 64', value: id.steamid64, inline: true },
						{ name: 'State', value: profile.state, inline: true },
						{ name: 'Privacy', value: profile.privacy, inline: true },
						{ name: 'Time created', value: profile.timecreated, inline: true },
						{
							name: "Banned by VAC (Valve' Anti Cheat system)",
							value: profile.vacbanned,
							inline: true
						}
					);
				}
			}
		});
	if (fields.length) {
		let number = parseInt(imports.args.pop());
		if (Number.isNaN(number) || !number) {
			number = 1;
		}
		let page = imports.getPage(fields, 6, number);
		embed = embed.setFooter(
			imports.trim(
				`Page ${page.page}/${page.pages} | ${embed.footer.text}`,
				2048
			)
		);
		for (let field of fields) {
			let index = fields.indexOf(field);
			if (!(index > page.end || index < page.start)) {
				embed = embed.addField(
					(field.name || 'unknown').toString(),
					'||' + (field.value || 'unknown').toString() + '||',
					field.inline
				);
			}
		}
	}
	return imports.message.channel.send(embed);
};
