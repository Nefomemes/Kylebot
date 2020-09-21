const supported = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
module.exports.run = async imports => {
	var emoji = imports.getEmojiFromMention(
		imports.args[0],
		imports.client.emojis
	);
	if (!emoji)
		return imports.message.channel.send(
			"Sorry, sir. Can't find any emojis on that."
		);
	imports.args.shift();
	var embed = new imports.Discord.MessageEmbed()
		.setColor(imports.colors.BG_COLOR)
		.setAuthor(
			imports.client.user.username,
			imports.client.user.displayAvatarURL({ dynamic: true, format: 'png' })
		)
		.setTimestamp()
		.setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`);
	var fields = [{name: 'Animated', value: emoji.animated.toString(), inline: true}, {name: 'Name', value: emoji.name, inline: true}, {name: 'ID', value: emoji.id, inline: true}];

	var format = imports.args[0] || 'png';
	if (!supported.includes(format)) format = 'png';

	if (emoji.animated) {
		format = 'gif';
	}
	embed = embed.setImage(
		`https://cdn.discordapp.com/emojis/${emoji.id}.${format}`
	);
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
			embed = embed.addField(
				(field.name || 'unknown').toString(),
				'||' + (field.value || 'unknown').toString() + '||',
				field.inline
			);
		}
	}
	return imports.message.channel.send(embed);
};
