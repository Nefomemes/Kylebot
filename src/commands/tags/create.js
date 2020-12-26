module.exports = {
	run: async (i) => {

		var tagsTable = new quickdb.table('bottags');

	if(!i.argv.n && !i.argv.t) return i.message.channel.send(
		"-n > The name for the tag\n-t > Tag content"
	) 	

	if(!i.argv.n) return i.message.channel.send(
		"-n > The name for the tag."
	);

	if(!i.argv.t) return i.message.channel.send(
		"-t > Tag content."
	);
	
	i.argv.n = i.argv.n.toLowerCase();
	
	var tags = tagsTable.all();

 
var scanName = (io, n = i.argv.n) => io.name.toLowerCase() === n.toLowerCase() || i.aliases && i.aliases.find((oi) => oi.toLowerCase() === n.toLowerCase()) || i.id === n;
	if(tags.find(scanName)) return i.message.channel.send("The name you trying to use is currently unavailable. Try another name.");

	if(i.argv.n.startsWith("TAG") && !Number.isNaN(parseInt(alias.slice(2)))) return i.message.channel.send("It seems the name you are trying use matched up with the reserved `TAG{number}` syntax that is used for tag IDs. Try another name.");




	if(i.argv.a){
	if(typeof i.argv.a !== "array"){
		i.argv.a = [`${i.argv.a}`];
	}

	for(let alias of aliases){
		if(tags.find((io) => scanName(io, alias))) return i.message.channel.send("One or some of the aliases you are trying to use is currently unavailable. Try another alias/es.");
		if(alias.starstWith("TAG") && !Number.isNaN(parseInt(alias.slice(2)))) return i.message.channel.send("It seems one or some of the aliases you are trying to use matched up with the reserved `TAG{number}` syntax that is used for tag IDs. Try another alias/es.");
	}

	}

var id = `TAG${tags.length + 1}`;

	tagsTable.set(id.slice(2),
	{
		name: i.argv.n.toLowerCase(),
		content: i.argv.t,
		aliases: i.argv.a || [],
		id: id,
		author: i.message.author.id,
		createdAt: Date.now(),
		views: 0
	})

	return i.message.channel.send("Done!");


	}
}