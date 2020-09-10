module.exports.run = async imports => {
	var channel;

	channel = await imports.getChannelFromMention(
		imports.args[0],
		imports.client.channels
	);

	if (channel) imports.args.shift();
	if (!channel) channel = imports.message.channel;

	var embed = new imports.Discord.MessageEmbed()
		.setColor(imports.colors.BG_COLOR)
		.setTitle('Channel Insights - Kylebot')
		.setAuthor(
			imports.client.user.username,
			imports.client.user.displayAvatarURL({ format: 'png', dynamic: true })
		)
		.setTimestamp()
		.setFooter(
			`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`,
			imports.client.user.displayAvatarURL({ format: 'png', dynamic: true })
		);
	var fields = [
		{ name: 'Channel ID', value: channel.id, inline: true },
		{
			name: 'Created at',
			value: new Date(channel.createdTimestamp).toUTCString(),
			inline: true
		},
		{ name: 'Type', value: channel.type, inline: true }
	];
	if (channel.name) {
		fields.push({ name: 'Name', value: channel.name, inline: true });
	}
	if (channel.topic) {
		embed = embed.setDescription(channel.topic);
	}

	fields.push({
		name: 'Deletable by me',
		value: (channel.deletable || false).toString(),
		inline: true
	});
	if (channel.nsfw) {
		fields.push({
			name: 'No Safe For Work (18+ content)',
			value: channel.nsfw,
			inline: true
		});
	}
	if (channel.guild) {
		var category = channel.parentID;
		if (category) category = `<#${category}>`;

		fields.push({
			name: 'Category',
			value: category || 'uncategorized',
			inline: true
		});
	}

	if (channel.rateLimitPerUser) {
		fields.push({
			name: 'Slowmode',
			value: `${channel.rateLimitPerUser} seconds`,
			inline: true
		});
	}
	if (channel.parentID){
	    fields.push({name: 'Synced to category', value: channel.permissionsLocked, inline: true});
	}
	fields.push({name: 'Viewable by me', value: channel.viewable, inline: true});
	switch (channel.type) {
	    
	
		case 'voice':
		        var limit = channel.userLimit;
		        if(limit <= 0) limit = "∞";
		        fields.push({name: "User limit", value: limit + " users", inline: true});
		    
		    fields.push({name: "Speakable by me", value: channel.speakable, inline: true});
			if (channel.bitrate) {
				fields.push({
					name: 'Bitrate',
					value: (channel.bitrate / 1000).toFixed(2) + ' kbps',
					inline: true
				});
			}
			if (channel.members) {
				fields.push(
			

					{
						name: 'Users connected',
						value: channel.members.filter(m => !m.user.bot).size + ' bots',
						inline: true
					},
					{
						name: 'Bots connected',
						value: channel.members.filter(m => m.user.bot).size + ' bots',
						inline: true
					},
					{
						name: 'Accounts connected',
						value: channel.members.size + ' accounts',
						inline: true
					}
				);
			}
	}
	let number = parseInt(imports.args.pop());
	if (Number.isNaN(number) || !number) {
		number = 1;
	}
	let page = imports.getPage(fields, 6, number);
	embed = embed.setFooter(
		imports.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048)
	);
	for (let field of fields) {
		let index = fields.indexOf(field);
		if (!(index > page.end || index < page.start)) {
			embed = embed.addField(field.name.toString(), "||" + field.value.toString() + "||", field.inline);
		}
	}
	return imports.message.channel.send(embed);
};
