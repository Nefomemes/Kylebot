
module.exports = {
    "name": "dbdisplay",
    run: async (imports) => {
        const idk = ["Tactical Nuke", "Advanced UAV", "UAV", "On a five kill streaks.", "On a ten kill streaks.", "Personal Radar", "Precision Airstrike"]
        var embed = new imports.Discord.MessageEmbed()
            .setColor(imports.colors.BG_COLOR)
            .setTitle(idk[Math.floor(Math.random() * idk.length)])
            .setAuthor(imports.message.author.username, imports.message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setTimestamp()
            .setFooter(`Prefix ${imports.prefix} | This command is currently in testing. Bugs may occurs.`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))


        var user = await imports.db.getDoc('users', imports.message.author.id);
        embed = embed.setThumbnail(imports.getEmblem(user.emblem).assets[0].asset || false).setImage(imports.getPlayercard(user.playercard).assets[0].asset || false);
        imports.message.channel.send(embed);

    }
}