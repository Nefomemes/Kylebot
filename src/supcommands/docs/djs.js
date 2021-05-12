module.exports.run = async i => {
	if (!i.argv.d) return;

	const query = i.argv.d
		.split('.')
		.join('#')
		.split('#');
	i.argv.b = i.argv.b || "stable";
	var embedTemplate = new i.Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setAuthor(
			`Discord.js (${i.argv.b})`,
			'https://avatars0.githubusercontent.com/u/26492485?s=200&v=4',
			`https://discord.js.org/#/docs/main/${i.argv.b}/general/welcome`
		)
		.setFooter(
			__.getFooter(),
			client.user.displayAvatarURL({ format: 'png', dynamic: true })
		)
		.setTimestamp();
	var embeds = [];
	var embed = new Discord.MessageEmbed(embedTemplate);
	var fields = [];
	
	var res = await fetch(
		`https://raw.githubusercontent.com/discordjs/discord.js/docs/${i.argv.b}.json`
	).then( i => i.text());

	try {
	res = JSON.parse(res);
	} catch {
		return i.message.channel.send(`Invalid branch.`);
	}

	var values = [];
	
for(let e of  res.classes){
	e._type = "class";
	values.push(e);
}

for(let e of res.typedefs){
	e._type = "typedef";
	values.push(e);
}
	var loadProps = (e, o, isSearch) => {
		if(!o) return;
		let queries = [];

		if(!o.endsWith("()")){
			for(let prop of e.props){
				prop._type = "prop";
				queries.push(prop);
			}

			o.slice(0, -2);
		} 

		for(let method of e.methods){
			method._type = "method";
			queries.push(method);
		}
if(!isSearch){
		var theChosenOne = queries.find(io => io.name.toLowerCase() === o.toLowerCase());
		return theChosenOne;
} else {
	var theChosenOne = queries.filter(io => io.name.toLowerCase().split(o.toLowerCase())[1] || o.toLowerCase().split(io.name.toLowerCase())[1]);
	return theChosenOne;
}

	};

	var getType = str => {
		let q = str.split('#');

		let item = values.find(o => o.name === q[0]);
		if (item) {
			let prop = loadProps(item, q[1]);
			
			

			return `https://discord.js.org/#/docs/main/${i.argv.b}/${
				item._type
			}/${item.name}${(() => {
				if (prop) return `?${querystring.stringify({ scrollTo: prop.name })}`;

				return '';
			})()}`;

			
		
		
	
		}

		var mdn = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${str}`;

		(async function() {
			const { status } = await fetch(mdn);

			if (status === 200) str = mdn;
		})();
		return str;
}
var search = false;

var e = values.find(e => e.name.toLowerCase() === query[0].toLowerCase());
	if (e) {
		if (!query[1]) {
			embed = embed.setDescription(
				`[${e.name}](${getType(e.name)})`
			);
			if (e._type === 'class') {
				
				if (e.extends) {
					try {
						embed = embed.setDescription(
							`${embed.description} (extends [${
								e.extends[0][0][0]
							}](${getType(e.extends[0][0][0])}))`
						);
					} catch {}
				}
				if (e.implements) {
					try {
						embed = embed.setDescription(
							`${embed.description} (implements [${
								e.implements[0][0][0]
							}](${getType(e.implements[0][0][0])}))`
						);
					} catch {}
				}
				
				if(e.construct){
					const construct = e.construct.params.map(io => `**\`${io.name}\`**\n${io.description || "No description."}\nDefault: ${io.default || "None"}\nType: ${(io.type || []).map(io => `[${io[0][0]}](${getType(io[0][0])})`).join(", ")}`).join("\n\n");

embed = embed.addField("Constructor", construct);				}
				
				var props = '';
				if (e.props) {
					for (let prop of e.props) {
						props = `${props} \`${prop.name}\``;
					}
				}
				embed = embed.addField(
					'Properties',
					props || 'There were no properties available.'
				);
				var methods = '';
				if (e.methods) {
					for (let method of e.methods) {
						methods = `${methods} \`${method.name}\``;
					}
				}
				embed = embed.addField(
					'Methods',
					methods || 'There were no methods available.'
				);
			
			} else if (e._type === 'typedef') {
				var types = '';
				if (e.type) {
					for (let [[type]] of e.type) {
						types = types + `\n- ${type}`;
					}
					types.slice(1);
				}
				embed.addField('Types', types || 'No types provided.');
			}
			embed.description = `${embed.description}\n${e.description}`;

			embed = embed.addField(
				'‎',
				`<:gh:770088022024388639> [Open source code on GitHub](https://github.com/discordjs/discord.js/blob/${i
					.argv.b || 'master'}/${e.meta.path}/${e.meta.file}#L${e.meta.line})`
			);
		} else if(e._type === "class") {

				var o = loadProps(e, query[1]);
			if (o) {
				embed = embed.setDescription(
					`__[${e.name}#${o.name}${(() => {
						if (o._type === 'method') return '()';
						return '';
					})()}](${getType(`${e.name}#${o.name}`)})__`
				);

				if (o.access) {
					embed = embed.setDescription(`${embed.description} (${o.access})`);
				}

				if (o.readonly) {
					embed = embed.setDescription(`${embed.description} (Read-only)`);
				}

				if (o._type === 'prop') {
					var types = '';
					if (o.type) {
						for (let [[type]] of o.type) {
							types = `${types}\n- [${type}](${getType(type)})`;
						}
						types.slice(1);
					}
					embed = embed.addField('Type', types || 'No types provided.');
				} else if (o._type === 'method') {
					if (o.implements) {
						embed = embed.setDescription(
							`${embed.description} (implements ${o.implements
								.map(c => `[${c}](${getType(c)})`)
								.join(', ')})`
						);
					}

					if(o.params){
						let paramsRendered = o.params.map(io => `**\`${io.name}\`**\n${io.description || "No description."}\nDefault: ${io.default || "None"}\nType: ${(io.type || []).map(io => `[${io[0][0]}](${getType(io[0][0])})`).join(", ")}`).join("\n\n");

						embed = embed.addField("Parameters", paramsRendered);
					}
					
					if(o.returns){
						embed = embed.addField("Returns", o.returns[0].map(io => `[${io[0]}](${getType(io[0])}) ${io[1]}`).join(" ").slice(0));
					}
					
					if (o.examples) {
						for (let example of o.examples) {
							let emb = new Discord.MessageEmbed(embedTemplate).setDescription(
								`\`\`\`js\n${__.trim(example, 2000 - 6 - 4)}\n\`\`\``
							);
							embeds.push(emb);
						}
					}
				}

				embed = embed.setDescription(`${embed.description}\n${o.description}`);

				embed = embed.addField(
					'‎',
					`<:gh:770088022024388639> [Open source code on GitHub](https://github.com/discordjs/discord.js/blob/${i
						.argv.b || 'master'}/${o.meta.path}/${o.meta.file}#L${o.meta.line})`
				);
			} else search = true;
		
		} else search = true;
		} else search = true;

	if (search) {
		var items = [];
		if(e){
			var childs  = loadProps(e, query[1], true)
			
			
			if(!childs.length) return i.message.channel.send(`There are no properties or methods of \`${e.name}\` that have a name close to that.`);
			
		for (let child of childs) {
		items.push(`${e.name}#${child.name}`)
		}
			
			} else {
		
		return i.message.channel.send(
			'For the time being, the search feature is not much available.'
		);
			}
			
			embed = embed.setDescription(
				`
				Found ${items.length} search results.\n\n${items.map(io => `- [${io}](${getType(io)})`).join("\n") || ""}
				`
				)
	}

	if (JSON.stringify(embed).length > 6000) {
		embed.footer.text = i.getRandomFunfact('');
	}

	i.message.channel.send(embed);
	


};
