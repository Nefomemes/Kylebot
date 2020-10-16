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
var i = 0;
		for (let arg of args) {
			let user = getUserFromMention(arg);
			if (user) {
				targets.push(user);
				i++;
			} else {
				break;
			}
		}
		for(let x = 0; x <= i; x++){
			imports.args.shift();
		}

		if (!targets.length) return imports.message.react('❌');
		if (targets.includes(imports.message.author))
			return imports.message.react('❌');
		var the_reason = imports.args.join(' ');
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
		let embedkill = new imports.Discord.MessageEmbed()
			.setColor(imports.colors.BG_COLOR)
			.setAuthor(
				imports.client.user.username,
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: true }),
				imports.website
			)
			.setDescription(
				imports.trim(
					`${imports.message.author} killed ${targets.join(', ')}${the_reason}`,
					2048
				)
			)
			.setImage(gifs)
			.setTimestamp()
			.setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`);
		imports.message.channel.send(embedkill);
	}

} 