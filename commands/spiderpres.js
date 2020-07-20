module.exports = {
    name:"spiderpres",
  run: async(imports)=>
    {try{
        const text = imports.args.join(" ") || "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you.";
        const image = `https://web.nefomemes.repl.co/api/spiderpres?${imports.querystring.stringify({text: text})}`;
        const embed = new imports.Discord.MessageEmbed()
        .setColor(imports.colors.BG_COLOR)
        .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format:"png", dynamic: true}), process.env.WEBSITE)
        .setDescription(`If the image doesn't looks like what you expected. \n Feel free to join our [support server](${process.env.WEBSITE}/support) and tell it to us. \n If the image doesn't load, try [click this](${image}).`)
        .setImage(image)
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`)
    imports.message.channel.send(embed)} catch(error){
        imports.message.channel.send("An error occured! " + error);
    }
    }
}