module.exports = {
	category: "rp",
	desc: "If you happy and you know it, run this command.",
	run: async i => {
		var the_reason = i.args.join(' ');
		if (the_reason) {
			the_reason = ` because "` + i.args.join(' ') + `".`;
		} else {
			the_reason = '.';
		}
		const gifs = [
			
		];
		const selectedGIF = gifs[Math.floor(Math.random() * gifs.length)];
		const embed = new Discord.MessageEmbed()

			.setColor(colors.BG_COLOR)
			.setAuthor(client.user.username,
client.user.displayAvatarURL({ format: 'png', dynamic: true }),
				i.website
			)
			.setDescription(
				i.trim(`${i.message.author} is happy${the_reason}`, 2048)
			)
			.setImage(selectedGIF)
			.setTimestamp()
			.setFooter(i.getFooter(), client.user.displayAvatarURL({dynamic: true, format: "png"}));
	 return i.message.channel.send(embed);
	}
	}