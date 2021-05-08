module.exports = {
	desc: "Kill a person",
	category: "rp",
	run: async imports => {
		var gifs,
			a = 0,
			targets = [];

		const getUserFromMention = mention => {
			if (!mention) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);
				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}
			}
			return imports.message.mentions.users.get(mention);
		};
var args = imports.args;
		for (let arg of args) {
			let user = getUserFromMention(arg);
			if (user) {
				targets.push(user);
				
			} else {
				break;
			}
		}

		if (!targets.length) return i.message.react('❌');
		if (targets.includes(i.message.author))
			return i.message.react('❌');
		var the_reason = i.args.join(' ');
		if (the_reason) {
			the_reason = ` because "` + imports.args.join(' ') + `".`;
		} else {
			the_reason = '.';
		}
		if (targets.length === 1) {
			gifs = [
				'https://i.imgur.com/wRTNTzP.gif',
				'https://i.imgur.com/cGsTWLw.gif',
				'https://i.imgur.com/qItOV7f.gif',
				'https://i.imgur.com/jhkqhed.gif',
				'https://i.imgur.com/GcpLcbq.gif',
				'https://i.imgur.com/XVEndwF.gif',
				'https://i.imgur.com/DwqjmeF.gif',
				'https://i.imgur.com/MGTVlf3.gif',
				'https://i.imgur.com/odeVVwc.gif'
			];
		} else if (targets.length === 2) {
			gifs = ['https://i.imgur.com/zDPfrrF.gif'];
		} else {
			gifs = ['https://i.imgur.com/OLeruXR.gif'];
		}

		gifs = gifs[Math.floor(Math.random() * gifs.length)];
		let embedkill = new Discord.MessageEmbed()
			.setColor(colors.BG_COLOR)
			.setAuthor(
				client.user.username,
			client.user.displayAvatarURL({ format: 'png', dynamic: true }),
				i.website
			)
			.setDescription(
				i.trim(
					`${i.message.author} killed ${targets.join(', ')}${the_reason}`,
					2048
				)
			)
			.setImage(gifs)
			.setTimestamp()
			.setFooter(i.getFooter(), client.user.displayAvatarURL({format: "png", dynamic: true}));
	return i.message.channel.send(embedkill);
	}

} 