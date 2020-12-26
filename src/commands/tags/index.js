module.exports = {
	run: async i => {
		var tagsTable = new quickdb.table('bottags');
		var scanName = (io, n = i.argv.t) => io.name.toLowerCase() === n.toLowerCase() || i.aliases && i.aliases.find((oi) => oi.toLowerCase() === n.toLowerCase()) || i.id === n;

		if(!i.argv.t) return i.message.channel.send("`-t --tag`");


	var tags = tagsTable.all();

	
	var tag = tags.find(io => scanName(io, i.argv.t));

	if(tag){

		return i.message.channel.send(new Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setAuthor(client.users.cache.get(tag.author).username, client.users.cache.get(tag.author).displayAvatarURL({format: "png", dynamic: true}))
		.setDescription(tag.content)
		.setFooter(`Views: ${ parseInt(tag.views || 0) } | ID: ${tag.id} | Created at `)
		.setTimestamp(tag.createdAt));
	} else {
		var queries = tags.filter((k) => 
			k.name.toLowerCas().split(i.argv.t.toLowerCase())[1] || i.argv.t.toLowerCase().split(k.name.toLowerCase())[1] || k.aliases.find(ko => ko.toLowerCase().split(i.argv.t.toLowerCase()))
		);

		if(!queries.length) return i.message.channel.send("There are no tags with that name. Try again."); 

		return i.message.channel.send(`Found ${queries.length} tags similar to that name.

		${queries.map(query => `- ${query.name}`).join("\n")}
		`);
	}
	}
}

