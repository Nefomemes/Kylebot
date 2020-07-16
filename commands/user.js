module.exports = {
  name: "user",
  category: "Information",
  description: "Get informations about a user.",
  usage: "```nefo!user [user] ",

  aliases: ["userinfo"],
  execute(imports) {
    var user, member;
    if(message.guild){
          member = imports.built_ins.getMemberFromMention(imports.args[0], message)|| imports.message.member;
            user = member.user;
    }else{
      user = message.author;
    }

    var embed = new imports.Discord.MessageEmbed()
    .setColor(require("../assets/configs/color.json").content.BG_COLOR)
    .setTitle(`${user.username}#${user.discriminator}`)
    .setAuthor(imports.client.user.username.split(" ")[0], imports.client.user.displayAvatarURL({format: "png", dynamic: true}), process.env.WEBSITE)
    .setThumbnail(user.displayAvatarURL({format: "png", dynamic: true}))
    .addFields(  
                {name: "ID", value: `${user.id}`, inline: true}, 
                {name: "Accout created at", value: user.createdAt}, 
                {name: "Presence Status", value: user.presence.status, inline: true}, 
                {name: "Client type", value: user.presence.clientStatus, inline: true},
                {name: "Bot", value: user.bot})
    .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.builts_in.getRandomFunfact()}`)

                if(imports.message.guild){
                  embed.addFields({name: "Joined the server since", value: member.joinedAt},
                                  {name: "Display name", value: member.displayName})
                  if(member.displayColor){
                    embed.addField( "Display color (Base 10)", member.displayColor, true);
                  }                
                  if(member.displayHexColor){
                    embed.setColor(member.displayHexCOlor)
                    embed.addField("Display color(Hex)", member.displayHexColor, true);
                  } 
                  if(member.premiumSince){
                    embed.addField("Boosting the server since", member.premiumSince);
                  } 
                  if(member.roles){
                    embed.addField("Highest roles", member.roles.highest);
                    if(member.roles.hoist){
                      embed.addField("Hoist role (the role that separate the user from other online users)", member.roles.hoist, true);
                    }
                  } 

                  imports.message.channel.send(embed);
                  
                }
  }
};
