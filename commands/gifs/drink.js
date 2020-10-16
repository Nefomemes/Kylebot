module.exports = {
	desc: "Drink.",
	category: "rp",
	run: async imports => {
    var the_reason = imports.args.join(' ');
    if (the_reason) {
        the_reason = ` because "` + imports.args.join(' ') + `".`;
    } else {
        the_reason = '.';
    }
    const gifs = [
        "https://i.imgur.com/X5LFW5g.gif"
    ];
    const selectedGIF = gifs[Math.floor(Math.random() * gifs.length)];
    const embed = new imports.Discord.MessageEmbed()

        .setColor(imports.colors.BG_COLOR)
        .setAuthor(
            imports.client.user.username,
            imports.client.user.displayAvatarURL({ format: 'png', dynamic: true }),
            imports.website
        )
        .setDescription(
            imports.trim(`${imports.message.author} drinks${the_reason}`, 2048)
        )
        .setImage(selectedGIF)
        .setTimestamp()
        .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`);
    imports.message.channel.send(embed);
}

}
 