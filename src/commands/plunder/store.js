module.exports.run = async (i) => {
	function seeItem(content, bundle, fields, embed, opts) {
	
		if (content) {
				
			let rarity;
			switch (content.rarity) {
				case 1:
					rarity = 'base';
					break;
				case 2:
					rarity = 'common';
					break;
				case 3:
					rarity = 'rare';
					break;
				case 4:
					rarity = 'epic';
					break;
				case 5:
					rarity = 'legendary';
					break;
				default:
					rarity = 'unknown';
			}
			fields.push({
				name: content.name || 'Unknown',
				value: `Worth ${content.price ||  bundle.price / bundle.content.length } <:cp:744403130594230313>. \n${content.desc}\nThis item have the rarity of **${rarity ||
					'unknown'}**.`,
				inline: true
			});
		if(opts){
				try {
					embed = embed.setImage(content.assets[0].asset);
				} catch { }
		}
			return embed;
		} else {
			embed.setDescription("There is no item in the bundle with this name.");
		} }

		const user = await db.collection("users").getDoc({ docID: i.message.author.id });
		var embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setTitle('Store')
			.setAuthor(
				client.user.username,
				client.user.displayAvatarURL({ format: 'png', dynamic: true })
			)
			.setTimestamp()
			.setFooter(
				`Prefix: ${i.prefix} | You have ${user.cp ||
				0} CP and  ${user.cash || 0} Plunder cash.`		);

		var fields = [];
		if (
			i.argv.b &&
			i.getItem('bundle', i.argv.b.toLowerCase())
		) {

			const item = i.getItem('bundle', i.argv.b.toLowerCase());
			embed = embed.setTitle(item.name + " - " + embed.title);
			item.content = item.content.map((c) => {
				if(c){
				return i.getItem(c.type, c.id);
				}
			});
			if (i.argv.c && i.argv.c === true) {
				item.content.forEach((smh) => seeItem(smh, item, fields, embed, false))
			} else if (i.argv.c && i.search(item.content, i.argv.c)) {
			embed =	seeItem(i.search(item.content, i.argv.c), item, fields, embed, true);
			} else {
				_.each(item, (value, key) => {
					if (key === 'content') {
						value = 'Set the `c` flag to true.';
					}
					fields.push({ name: key, value: value, inline: true });
				});
			}
		} else {
			const bundles = i.getItem('bundle', null, 'all').filter(bundle => {
				if (bundle.available && bundle.available === false) return false;
				return true;
			});
			for (let bundle of bundles) {
				let user_can_buy;
				if (
					user.cp &&
					user.cp !== 0 &&
					bundle.price &&
					user.cp - bundle.price >= 0
				) {
					user_can_buy = '';
				} else {
					user_can_buy = "**Sadly, you doesn't have enough funds. :cry:**\n";
				}

				fields.push({
					name: bundle.name || 'Unknown',
					value: i.trim(`${bundle.desc ||
						'<redacted>.'} \nThis bundle costs ${bundle.price ||
						'<redacted>'} <:cp:744403130594230313>. ${user_can_buy}`,
						1024
					),
					inline: true
				});
			}
		}
		let number = parseInt(i.argv.p);
		if (Number.isNaN(number)) {
			number = 1;
		}
		let page = i.getPage(fields, 6, number);
		embed = embed.setFooter(i.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048));
		for (let field of fields) {
			let index = fields.indexOf(field);
			if (!(index > page.end || index < page.start)) {
				embed = embed.addField((field.name || "unknown").toString(),  (field.value || "unknown").toString(), field.inline);
			}
		}

		return i.message.channel.send(embed);
	};
