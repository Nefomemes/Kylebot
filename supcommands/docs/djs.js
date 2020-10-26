module.exports.run = async (i) => {

if(!i.argv.d) return i.message.channel.send()

    const query = i.argv.d.split(".").join("#").split("#");


    var embed = new i.Discord.MessageEmbed()
    .setColor(colors.BG_COLOR)
    .setAuthor(`Discord.js (${i.argv.b || master})`, "https://avatars0.githubusercontent.com/u/26492485?s=200&v=4", "https://discord.js.org/")
    .setThumbnaiL("https://raw.githubusercontent.com/discordjs/discord.js/master/docs/logo.svg")
    .setFooter(`Prefix: ${i.prefix} | | ${i.getRandomFunfact()}`)
    .setTimestamp();
var fields = [];
    const res = await fetch(`https://raw.githubusercontent.com/discordjs/discord.js/docs/${i.argv.b || "master"}.json`).then(i => i);
    const docs = await i.json();
if(!res.ok) return imports.message.channel.send(`Ugh, sir. We received error ${res.status} with message "${res.statusText}".`);
var values = [];
values.push(...imports.test.classes);
values.push(...imports.test.typedefs);
var class1 = values.find(i => i.name === query[0]);

if(class1){
if(!query[1]){
embed = embed.setDescription(`[${class1.name}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${class1.name})`);
if(class1.extends){
try {
embed = embed.setDescription(`${embed.description} (extends [${class1.extends[0][0][0]}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${class1.extends[0][0][0]}))`)
} catch {}
}
if(class1.implements){
	try {
		embed = embed.setDescription(`${embed.description} (implements [${class1.implements[0][0][0]}](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${class1.implements[0][0][0]}))`);
	} catch {}
}

embed = embed.setDescription(`${embed.description}\n\n${class1.description}`);
var props;
for(let prop of class1.props){
	props = `${props || ''} [\`${prop.name}\`](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${class1.name}?scrollTo=${prop.name})`;
}

embed = embed.addField("Properties", props);

var methods;
for(let method of class1.methods){
	methods = `${methods || ''} [\`${method.name}\`](https://discord.js.org/#/docs/main/${i.argv.b || "master"}/class/${class1.name}?scrollTo=${method.name})`;
}

embed = embed.addField('Methods', methods).addField('‎', `[<:gh:770088022024388639>](https://github.com/discordjs/discord.js/blob/${i.argv.b || "master"}/${class1.meta.path}${class1.meta.file})`;
} else {

}
} else {
	
}
 return i.message.channel.send(embed);
};