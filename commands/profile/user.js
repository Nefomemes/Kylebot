module.exports = {
  name: "user",
  run: async (imports) => {
    var user, member, userDB;
 user  = imports.getUserFromMention(imports.args[0], imports.client) || imports.message.author;
 if(imports.message.guild){
     member = await imports.getMemberFromMention(user.id, imports.message.guild.members) || imports.message.member;
     user = member.user;
 }
 

var embed = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setAuthor(imports.client.user.username.split(" ")[0], imports.client.user.displayAvatarURL({ format: "png", dynamic: true }), process.env.WEBSITE)
      .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true })).setTimestamp()
var fields = [ { name: "ID", value: `${user.id}`, inline: true },
        { name: "Accout created at", value: user.createdAt, inline: true},
        { name: "Bot", value: user.bot }]
    if (imports.message.guild) {
      fields.push({ name: "Joined the server since", value: member.joinedAt, inline: true },
        { name: "Display name", value: member.displayName })
      if (member.displayColor) {
        fields.push({name: "Display color (Base 10)", value: member.displayColor,inline: true});
      }
      if (member.displayHexColor) {
        embed = embed.setColor(member.displayHexColor)
        fields.push({name: "Display color(Hex)", value: member.displayHexColor, inline: true});
      }
      if (member.premiumSince) {
        fields.push({name: "Boosting the server since", value: member.premiumSince, inline: true });
      }
      if (member.roles) {
        fields.push({name: "Highest roles", value: member.roles.highest, inline: true});
        if (member.roles.hoist) {
          fields.push({name: "Hoist role (the role that separate the user from other online users)", value: member.roles.hoist, inline: true});
        }
      }
    }
    if(!user.bot){
      userDB = await imports.db.getDoc('users', user.id);
      if(userDB.desc){
        embed = embed.setDescription(userDB.desc);
      }
   fields.unshift({name: "COD Points", value: `${userDB.cp || 0} <:cp:744403130594230313>`, inline:true},
                                {name: "Cash", value: userDB.cash || 0, inline:true});
      try{
      embed = embed.setThumbnail(imports.getItem("emblem", userDB.emblem).assets[0].asset).setImage(imports.getItem("playercard", userDB.playercard).assets[0].asset); 
      } finally {
          
      }
    }
      let number = parseInt(imports.args[0]);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, field.value, field.inline);
                    }
            }

    imports.message.channel.send(embed);
  }
};
