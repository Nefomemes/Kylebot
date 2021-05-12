
module.exports = {
	desc: "Get the information of a server.",
	 run: async i => {
		var guild;
		if(!Number.isNaN(parseInt(i.argv.g))){
			try {
			guild = await client.guilds.fetch(i.argv.g);
			} catch {
				guild = i.message.guild;
			}
		} else { guild = i.message.guild };
if(!guild) return i.message.channel.send("Unknown server. Add the `g` option with the ID of the server you want to check. Default sets to the server you are currently in (smh not if you ran it in DM).");
		const guildDB = db.collection("guilds").getDoc({ docID: guild.id });

		var embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setTitle(guild.name)
			.setAuthor( client.user.username,
				client.user.displayAvatarURL({ format: 'png', dynamic: true })
			)
			.setThumbnail(guild.iconURL({ format: 'png', dynamic: true }))
			.setTimestamp()
			.setFooter(
				`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`,
				i.client.user.displayAvatarURL({ format: 'png', dynamic: true })
			);

		var fields = [
			{ name: 'Owner', value: `<@!${guild.ownerID}>`, inline: true },
			{
				name: 'Server created at',
				value: new Date(guild.createdTimestamp).toUTCString(),
				inline: true
			},
			{ name: 'Server region', value: guild.region, inline: true },
			{ name: 'Members', value: guild.memberCount, inline: true },
			{
				name: 'Booster members',
				value: guild.premiumSubscriptionCount,
				inline: true
			},
			{ name: 'Channels', value: guild.channels.cache.size, inline: true },
			{
				name: 'Categories',
				value: guild.channels.cache.filter(function(channel) {
					return channel.type && channel.type === 'category';
				}).size,
				inline: true
			},
			{
				name: 'Text channels',
				value: guild.channels.cache.filter(function(channel) {
					return channel.type && channel.type === 'text';
				}).size,
				inline: true
			},
			{
				name: 'Voice channels',
				value: guild.channels.cache.filter(function(channel) {
					return channel.type && channel.type === 'voice';
				}).size,
				inline: true
			},
			{
				name: 'News channels',
				value: guild.channels.cache.filter(function(channel) {
					return channel.type && channel.type === 'news';
				}).size,
				inline: true
			},
			{
				name: 'Store channels',
				value: guild.channels.cache.filter(function(channel) {
					return channel.type && channel.type === 'store';
				}).size,
				inline: true
			},
			{ name: 'Roles', value: guild.roles.cache.size, inline: true },
			{ name: 'Emojis', value: guild.emojis.cache.size, inline: true },
			{
				name: 'Animated emojis',
				value: guild.emojis.cache.filter(function(emoji) {
					return emoji.animated && emoji.animated === true;
				}).size,
				inline: true
			},
			{
				name: 'Non-animated emojis',
				value: guild.emojis.cache.filter(function(emoji) {
					return emoji.animated && emoji.animated === false;
				}).size,
				inline: true
			},
			{ name: 'Boost Tier', value: guild.premiumTier, inline: true },
			{
				name: 'Verification level',
				value: guild.verificationLevel,
				inline: true
			},
			{
				name: 'Explicit content filter',
				value: guild.explicitContentFilter,
				inline: true
			},
			{ name: 'MFA level', value: guild.explicitContentFilter, inline: true }
		];

		if (guild.systemChannel) {
			fields.push({
				name: 'System channel',
				value: guild.systemChannel,
				inline: true
			});
		}
		if (guild.rulesChannel) {
			fields.push({
				name: 'Rules channel',
				value: guild.rulesChannel,
				inline: true
			});
		}
		if (guild.widgetChannel) {
			fields.push({
				name: 'Widget channel',
				value: guild.widgetChannel,
				inline: true
			});
		}
		if (guildDB.desc) {
			embed = embed.setDescription(guildDB.desc);
		} else if (guild.description) {
			embed = embed.setDescription(guild.description);
		}

		let number = parseInt(i.argv.p);
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
					(field.name || 'unknown').toString(),
					'||' + (field.value || 'unknown').toString() + '||',
					field.inline
				);
			}
		}
	 return i.message.channel.send(embed);
	}
}