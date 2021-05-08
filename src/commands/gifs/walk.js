module.exports = {
	desc: "Walk like a Putin.",
	category: "rp",
	run: async (imports) => {
		var the_reason = imports.args.join(' ');
		if (the_reason) {
			the_reason = ` 'cuz "` + imports.args.join(' ') + `".`;
		} else {
			the_reason = '.';
		}
		const gifs = ['https://i.imgur.com/MESIUlb.gif'];
		const selectedGIF = gifs[Math.floor(Math.random() * gifs.length)];
		const embed = new imports.Discord.MessageEmbed()

			.setColor(imports.colors.BG_COLOR)
			.setAuthor(
				imports.client.user.username,
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: true }),
				process.env.WEBSITE
			)
			.setDescription(
				imports.trim(
					`${imports.message.author} is  walkin' down the hall${the_reason}`,
					2048
				)
			)
			.setImage(selectedGIF)
			.setTimestamp()
			.setFooter(
				`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`,
				imports.client.user.displayAvatarURL({ format: 'png', dynamic: 'true' })
			);
		imports.message.channel.send(embed);
	}

}
 