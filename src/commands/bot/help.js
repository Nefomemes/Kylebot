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
		.setFooter(__.getFooter(),
			i.client.user.displayAvatarURL({ dynamic: true, format: 'png' })
		)
		.setTimestamp();


	let categories = require(path.join(
		process.__maindir,
		'assets', 'categories.json'
	));
	var k = 6;
	function getCategory(name) {
		if (!name) return;
		let modules = categories.filter(function(category) {
			return category.name.toLowerCase().split(name.toLowerCase())[1] || category.id === name;
		});
		if (!modules.length) return;
		if (modules.length > 1) return;
		return modules[0];
	}
	function getDesc(command){
		return (command.desc || command.description || "No description.") + ` [Read the documentation.](${command.docs || "https://github.com/Nefomemes/docs/trees/master/Kylebot"})`
	}
	function pushToFields(command){
		return embed = embed.addField(command.name, getDesc(command), false)
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
		const category = getCategory(i.argv._[0]);
embed = embed.setDescription(getDesc(category));
			let commands = await i.client.commands.cache
				.filter(command => command.category === category.id)
				.map(i => i);
			commands.forEach(pushToFields);
		
	} else {
		k = 2; 
		embed = embed.setImage('https://i.imgur.com/q3EWSPl.gif');
		categories.forEach(pushToFields);
	}

	embed = __.embedPagify(embed, 
	{
		page: i.argv.p,
		length: k
	}
	);
	
	return i.message.channel.send(embed);
}
}