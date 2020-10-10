module.exports.run = async (imports) => {
		var gifs;
		var targets = [];
		const getUserFromMention = mention => {
			if (!mention || !imports.message) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);
				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}
			}
			return imports.message.mentions.users.get(mention);
		};

		for (let arg of imports.args) {
			let user = getUserFromMention(arg);
			if (user) {
				targets.push(user);
				imports.args.shift();
			} else {
				break;
			}
		}

		if (!targets.length) return imports.message.react('❌');
		if (targets.length === 1) {
			gifs = [
				
			];
		} else {
			gifs = [
				
			];
		}

		var the_reason = imports.args.join(' ');
		if (the_reason) {
			the_reason = ` because "` + imports.args.join(' ') + `".`;
		} else {
			the_reason = '.';
		}

		const embed = new imports.Discord.MessageEmbed()
			.setColor(imports.colors.BG_COLOR)
			.setAuthor(
				imports.client.user.username,
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: true }),
				process.env.WEBSITE
			)
			.setDescription(
				imports.trim(
					`${imports.message.author}` +
						' betrayed ' +
						targets.join(', ') +
						the_reason,
					2048
				)
			)
			.setImage(gifs[Math.floor(Math.random() * gifs.length)])
			.setTimestamp()
			.setFooter(
				`Prefix: ${imports.prefix} | ` + imports.getRandomFunfact(),
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: true })
			);

		imports.message.channel.send(embed);
	}
