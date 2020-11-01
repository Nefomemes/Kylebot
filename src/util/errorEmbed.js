
module.exports = function errorEmbed(error){
		  
        const embed = new Discord.MessageEmbed()
    .setColor(colors.BG_COLOR)
    .setAuthor("Report Issue on GitHub", "https://raw.githubusercontent.com/Nefomemes/Kylebot/master/assets/GitHub-Mark-Light-120px-plus.png", "https://github.com/Nefomemes/Kylebot/issues/new")
    .setDescription("```" + __.trim(util.inspect(error), 2048 - 6) + "```")
    .setFooter(__.getFooter("Please make sure noone have ever posted a similar issue and please provide reproduction steps."), global.client.user.displayAvatarURL({dynamic: true, format: "png"}))
    .setTimestamp()
    
    .setTitle("An error occured!")
    return embed;
}