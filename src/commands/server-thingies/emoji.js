const supported = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
module.exports.run = async i => {
	var emoji = i.getEmojiFromMention(
		i.argv.e,
		client.emojis
	);
		var embed = new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setAuthor(
			client.user.username,
			client.user.displayAvatarURL({ dynamic: true, format: 'png' })
		)
		.setTimestamp()
		.setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`);
	if (!emoji) {
 return i.message.channel.send("Invalid emoji!")
	}
	
	var fields = [{name: 'Animated', value: emoji.animated.toString(), inline: true}, {name: 'Name', value: emoji.name, inline: true}, {name: 'ID', value: emoji.id, inline: true}];

	var format = i.argv.f || 'png';
	if (!supported.includes(format)) format = 'png';

	if (emoji.animated) {
		format = 'gif';
	}
	embed = embed.setImage(
		`https://cdn.discordapp.com/emojis/${emoji.id}.${format}`
	);
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
				  (field.value || 'unknown').toString(), field.inline
			);
		}
	}
	return i.message.channel.send(embed);
};
