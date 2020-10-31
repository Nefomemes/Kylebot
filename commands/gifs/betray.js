module.exports = {
category: "rp",
desc: "Betray a friend.",
run: async (i) => {
		var gifs;
		var targets = [];
		const getUserFromMessageMention = mention => {
			if (!mention || !i.message) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);
				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}
			}
			return i.message.mentions.users.get(mention);
		};

		for (let arg of imports.args) {
			let user = getUserFromMessageMention(arg);
			if (user) {
				targets.push(user);
				i.args.shift();
			} else {
				break;
			}
		}

		if (!targets.length) return i.message.react('❌');
		if (targets.length === 1) {
			gifs = [
				
			];
		} else {
			gifs = [
				
			];
		}

		var the_reason = i.args.join(' ');
		if (the_reason) {
			the_reason = ` because "` + i.args.join(' ') + `".`;
		} else {
			the_reason = '.';
		}

		const embed = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setAuthor(
				client.user.username,
			client.user.displayAvatarURL({ format: 'png', dynamic: true }),
			i.website
			)
			.setDescription(
			i.trim(
					`${i.message.author}` +
						' betrayed ' +
						targets.join(', ') +
						the_reason,
					2048
				)
			)
			.setImage(gifs[Math.floor(Math.random() * gifs.length)])
			.setTimestamp()
			.setFooter(i.getFooter(),
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: true })
			);

		return i.message.channel.send(embed);
	}

}

