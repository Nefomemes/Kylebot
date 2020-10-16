module.exports = {
	aliases: ["h"],
	category: "bot",
	run: async i => {
	var embed = new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setAuthor(
			client.user.username,
			client.user.displayAvatarURL({ dynamic: true, format: 'png' })
		)
		.setThumbnail(
			client.user.displayAvatarURL({ format: 'png', dynamic: true })
		)
		.setFooter(
			'Prefix: ' + i.prefix + ' | ' + i.getRandomFunfact(),
			i.client.user.displayAvatarURL({ dynamic: true, format: 'png' })
		)
		.setTimestamp();

	var fields = [];
	let categories = require(path.join(
		process.cwd(),
		'assets/categories'
	)).content;
	function getCategory(name) {
		if (!name) return;
		let modules = categories.filter(function(category) {
			return (
				category.name.toLowerCase().split(name.toLowerCase())[1] ||
				category.id === name
			);
		});
		if (!modules.length) return;
		if (modules.length > 1) return;
		return modules[0];
	}
	function getDesc(command){
		return (command.desc || command.description || "No description.") + `[]Read the documentation.](${command.docs || "https://github.com/Nefomemes/docs"})`
	}
	function pushToFields(command){
		return fields.push({	name: command.name,
					value: getDesc(command),
					inline: true
						})
	}
	if (i.getCommand(i.args[0], client.commands.cache)) {
		var command = i.getCommand(
			i.args.shift(),
			client.commands.cache
		); 
		if(command.commands){
			if(i.getCommand(i.args[0], command.commands)){
					command = i.getCommand(
					i.args.shift(),
					command.commands
				)
		
			} else {
				command.commands.forEach(pushToFields);
			}
		} 
			embed = embed.setDescription(getDesc(command));
			
	} else if (getCategory(i.args[0])) {
		const category = getCategory(imports.args.shift());
		if (category) {
			let commands = await i.client.commands.cache
				.filter(command => {
					if (command.category && command.category === category.id) return true;

					if (!command.category && category.id === 'misc') return true;
				})
				.map(i => i);
			commands.forEach(pushToFields);
		}
	} else {
		embed = embed.setImage('https://i.imgur.com/q3EWSPl.gif');
		categories.forEach(pushToFields);
	}

	let number = parseInt(imports.args.pop());
	if (Number.isNaN(number) || !number) {
		number = 1;
	}
	let page = imports.getPage(fields, 4, number);
	embed = embed.setFooter(
		imports.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048)
	);
	for (let field of fields) {
		let index = fields.indexOf(field);
		if (!(index > page.end || index < page.start)) {
			embed = embed.addField(
				(field.name || 'unknown').toString(), (field.value || 'redacted').toString(),
				field.inline
			);
		}
	}
	return imports.message.channel.send(embed);
}
}