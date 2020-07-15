module.exports = {
    name:"spiderpres",
    execute(imports){try{
        const text = imports.args.join(" ") || "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you.";
        const embed = new imports.Discord.MessageEmbed()
        .setColor(process.env.BG_COLOR)
        .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format:"png", dynamic: true}), process.env.WEBSITE)
        .setDescription("If the image doesn't looks like what you expected. \n Feel free to join our [support server](https://nefomemes.herokuapp.com/kylebot/support) and tell it to us.")
        .setImage(`https://nefomemes.herokuapp.com/api/spiderpres?${imports.querystring.stringify({text: text})}`)
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`)
    imports.message.channel.send(embed)} catch(error){
        imports.message.channel.send("An error occured! " + error);
    }
    }
}