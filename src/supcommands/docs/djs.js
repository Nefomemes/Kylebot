
module.exports.run = async (i) => {

if(!i.argv.d) return i.message.channel.send()

    const query = i.argv.d.split(".").join("#").split("#");


    var embed = new i.Discord.MessageEmbed()
    .setColor(colors.BG_COLOR)
    .setAuthor(`Discord.js (${i.argv.b || "master"})`, "https://avatars0.githubusercontent.com/u/26492485?s=200&v=4", "https://discord.js.org/")
    .setFooter(`Prefix: ${i.prefix} | | ${i.getRandomFunfact()}`, client.user.displayAvatarURL({format: "png", dynamic: true}))
    .setTimestamp();
var fields = [];
    const res = await fetch(`https://raw.githubusercontent.com/discordjs/discord.js/docs/${i.argv.b || "master"}.json`).then(i => i.json());

var values = [];
for(let class1 of res.classes){
	class1._type = "class"
	values.push(class1)
}
for(let typedef of res.typedefs){
	typedef._type = "typedef"
	values.push(typedef)
}
var e = values.find(o => o.name.toLowerCase() === query[0].toLowerCase());
var search = false;
if(e){
if(!query[1]){
embed = embed.setDescription(`[${e.name}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/${e._type}/${e.name})`);
if(e._type === "class"){
if(e.extends){
try {
embed = embed.setDescription(`${embed.description} (extends [${e.extends[0][0][0]}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${e.extends[0][0][0]}))`)
} catch {}
}


if(e.implements){
	try {
		embed = embed.setDescription(`${embed.description} (implements [${e.implements[0][0][0]}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${e.implements[0][0][0]}))`);
	} catch {}
}



var props = '';
if(e.props){

	for(let prop of e.props){
		props = `${props} \`${prop.name}\``;
	}
}
embed = embed.addField("Properties", props || "There were no properties available.");

var methods = '';
if(e.methods){
 for(let method of e.methods){
 	methods = `${methods} \`${method.name}\``
 }
}
embed = embed.addField('Methods', methods || "There were no methods available.");
} else if(e._type === "typedef"){
	var types = '';
	if(e.type){
		for(let [[type]] of e.type){
			types = types + `\n- ${type}`
		}
		types.slice(1);
		
	}
	embed.addField('Types', types || "No types provided.");
}
embed.description = `${embed.description}\n\n${e.description}`;

embed = embed.addField('‎', `<:gh:770088022024388639> [Open source code on GitHub](https://github.com/discordjs/discord.js/blob/${i.argv.b || "master"}/${e.meta.path}/${e.meta.file})`);
} else {
	var queries = [];
	if(!query[1].endsWith("()")){
	query[1].slice(0, -2);
	 for(let prop of e.props){
	 	prop._type = "prop";
	 	queries.push(prop);
	 }
	}
	for(let method of e.methods){
		method._type = "method";
		queries.push(method);
	}
	var prop = queries.find(i => i.name.toLowerCase() === query[1].toLowerCase());
	if(prop){
         		
	} else {
        search = true;
      }
}
} else {
search = true;	
}

if(search){
	return i.message.channel.send("For the timr being y")
}

if(JSON.stringify(embed).length > 6000){
	embed.footer.text = i.getRandomFunfact("");
}


 return i.message.channel.send(embed);
};