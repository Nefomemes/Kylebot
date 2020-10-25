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
	));
	var k = 6;
	function getCategory(name) {
		if (!name) return;
		let modules = categories.filter(function(category) {
			return 
				category.name.toLowerCase().split(name.toLowerCase())[1] || category.name.toLowerCase() === name.toLowerCase()||
				category.id === name;
		});
		if (!modules.length) return;
		if (modules.length > 1) return;
		return modules[0];
	}
	function getDesc(command){
		return (command.desc || command.description || "No description.") + ` [Read the documentation.](${command.docs || "https://github.com/Nefomemes/docs/trees/master/Kylebot"})`
	}
	function pushToFields(command){
		return fields.push({	name: command.name,
					value: getDesc(command),
					inline: false
						})
	}
	if (i.getCommand(i.argv._[0], client.commands.cache)) {
		var command = i.getCommand(
			i.argv._.shift(),
			client.commands.cache
		); 
		if(command.commands){
			if(i.getCommand(i.argv._[0], command.commands)){
					command = i.getCommand(
					i.argv._.shift(),
					command.commands
				)
		
			} else {
				command.commands.forEach(pushToFields);
			}
		} 
			embed = embed.setDescription(getDesc(command));
			
	} else if (getCategory(i.argv._[0])) {
		const category = getCategory(imports.argv._.shift());
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
		k = 2; 
		embed = embed.setImage('https://i.imgur.com/q3EWSPl.gif');
		categories.forEach(pushToFields);
	}

	let number = parseInt(i.argv.p);
	if (Number.isNaN(number) || !number) {
		number = 1;
	}
	let page = i.getPage(fields, k, number);
	embed = embed.setFooter(
		i.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048)
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
	return i.message.channel.send(embed);
}
}