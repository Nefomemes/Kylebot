
module.exports = {
	run: async (i) => {
	if(!i.argv.n && !i.argv.t && !i.argv.a) return i.message.channel.send(
		"```\n-n --name The name of the tag\n-t --tag The new tag content (optional)\n-a --aliases Aliases of the tag"
	) 	


	i.argv.n = i.argv.n.toLowerCase();
	var tagsTable = new quickdb.table("bottags");
	var tags = tagsTable.all();
 
var scanName = (io, n = i.argv.n) => io.name.toLowerCase() === n.toLowerCase() || i.aliases && i.aliases.find((oi) => oi.toLowerCase() === n.toLowerCase()) || i.id === n;
	var tag = tags.find(scanName);
	if(!tag) return i.message.channel.send("The are no tags with that name.");

	if(tag.author !== i.message.author.id) return i.message.channel.send("You does not own this tag.");


	if(i.argv.a){
	if(typeof i.argv.a !== "array"){
		i.argv.a = [`${i.argv.a}`];
	}

	for(let alias of aliases){
		if(tags.find((io) => scanName(io, alias))) return i.message.channel.send("One or some of the aliases you are trying to use is currently unavailable. Try another alias/es.");
		if(alias.starstWith("TAG") && !Number.isNaN(parseInt(alias.slice(2)))) return i.message.channel.send("It seems one or some of the aliases you are trying to use matched up with the reserved `TAG{number}` syntax that is used for tag IDs. Try another alias/es.");
		tagsTable.push(`${tag.id}.aliases`, alias);
	}

	}


	if(i.argv.t) tagsTable.set(`${tag.id}.content`, i.trim(i.argv.t, 2000));

	return i.message.channel.send("Done!");

	
	}
}


