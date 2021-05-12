module.exports = {
	desc: "Drink.",
	category: "rp",
	run: async i => {
    var the_reason = i.args.join(' ');
    if (the_reason) {
        the_reason = ` because "` + i.args.join(' ') + `".`;
    } else {
        the_reason = '.';
    }
    const gifs = [
        "https://i.imgur.com/X5LFW5g.gif"
    ];
    const selectedGIF = gifs[Math.floor(Math.random() * gifs.length)];
    const embed = new Discord.MessageEmbed()

        .setColor(colors.BG_COLOR)
        .setAuthor(
        client.user.username,
            client.user.displayAvatarURL({ format: 'png', dynamic: true }),
            i.website
        )
        .setDescription(
            i.trim(`${i.message.author} drinks${the_reason}`, 2048)
        )
        .setImage(selectedGIF)
        .setTimestamp()
        .setFooter(i.getFooter(), client.user.displayAvatarURL({dynamic: true, format: "png"}));
    i.message.channel.send(embed);
}

}
 