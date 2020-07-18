module.exports = {
    name: "walk",

    execute(imports){
        var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` 'cuz "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
        const gifs = [ "https://i.imgur.com/MESIUlb.gif" ]
        const selectedGIF = gifs[Math.floor(Math.random()*gifs.length)];
        const embed = new imports.Discord.MessageEmbed()

        .setColor(require("../assets/configs/color.json").content.BG_COLOR)
        .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}), process.env.WEBSITE)
        .setDescription(`${imports.message.author} do be walkin' down the hall${the_reason}`)
        .setImage(selectedGIF)
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`)
        imports.message.channel.send(embed);
    }
}