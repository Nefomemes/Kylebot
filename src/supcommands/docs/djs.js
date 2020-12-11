module.exports.run = async i => {
	if (!i.argv.d) return i.message.channel.send();

	const query = i.argv.d
		.split('.')
		.join('#')
		.split('#');

	var embedTemplate = new i.Discord.MessageEmbed()
		.setColor(colors.BG_COLOR)
		.setAuthor(
			`Discord.js (${i.argv.b || 'master'})`,
			'https://avatars0.githubusercontent.com/u/26492485?s=200&v=4',
			'https://discord.js.org/'
		)
		.setFooter(
			__.getFooter(),
			client.user.displayAvatarURL({ format: 'png', dynamic: true })
		)
		.setTimestamp();
	var embeds = [];
	var embed = new Discord.MessageEmbed(embedTemplate);
	var fields = [];
	const res = await fetch(
		`https://raw.githubusercontent.com/discordjs/discord.js/docs/${i.argv.b ||
			'master'}.json`
	).then(i => i.json());

	var values = [];
	var loadProps = (e, o) => {
		var queries = [];
		if (!o.endsWith('()')) {
			if (e.props) {
				for (let prop of e.props) {
					prop._type = 'prop';
					queries.push(prop);
				}
			}
		} else {
			o.slice(0, -2);
		}
		if (e.methods) {
			for (let method of e.methods) {
				method._type = 'method';
				queries.push(method);
			}
		}
		return queries.find(i => i.name.toLowerCase() === o.toLowerCase());
	};

	var getType = str => {
		let q = str.split('#');
		let item = values.find(o => o.name.toLowerCase() === q[0].toLowerCase());

		if (item) {
			let prop = loadProps(item, q[1]);

			return `https://discord.js.org/#/docs/main/${i.argv.b || 'master'}/${
				item._type
			}/${item.name}${() => {
				if (prop) return `?${querystring.stringify({ scrollTo: prop.name })}`;

				return '';
			}}`;
		}

		var mdn = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${str}`;

		(async function() {
			const { status } = await fetch(mdn);

			if (status === 200) str = mdn;
		})();
		return str;
}

	if (e) {
		if (!query[1]) {
			embed = embed.setDescription(
				`[${e.name}](https://discord.js.org/#/docs/main/${i.argv.b ||
					'master'}/${e._type}/${e.name})`
			);
			if (e._type === 'class') {
				if (e.extends) {
					try {
						embed = embed.setDescription(
							`${embed.description} (extends [${
								e.extends[0][0][0]
							}](https://discord.js.org/#/docs/main/${i.argv.b ||
								'master'}/class/${e.extends[0][0][0]}))`
						);
					} catch {}
				}
				if (e.implements) {
					try {
						embed = embed.setDescription(
							`${embed.description} (implements [${
								e.implements[0][0][0]
							}](https://discord.js.org/#/docs/main/${i.argv.b ||
								'master'}/class/${e.implements[0][0][0]}))`
						);
					} catch {}
				}
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
		}
		} else {
			var o = loadProps(e, query[1]);
			if (o) {
				embed = embed.setDescription(
					`__[${e.name}#${o.name}${(() => {
						if (o.__type === 'method') return '()';
						return '';
					})()}](https://discord.js.org/#/docs/main/${i.argv.b ||
						'master'}/class/${e.name}?${querystring.stringify({
						scrollTo: o.name
					})})__`
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
			} else {
				search = true;
			}
		}

	if (search) {
		return i.message.channel.send(
			'For the time being, the search feature is not available.'
		);
	}

	if (JSON.stringify(embed).length > 6000) {
		embed.footer.text = i.getRandomFunfact('');
	}

	i.message.channel.send(embed);
	for (let emb of embeds) {
		emb.footer.text = __.getFooter();
		i.message.channel.send(emb);
		await setTimeout(() => {}, 100000);
	}
};
