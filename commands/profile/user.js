module.exports = {
  name: "user",
  run: async (i) => {
    var user, member, userDB;
 user  = await i.getUserFromMention(i.argv.user, i.client.users) || i.message.author;
 if(i.message.guild){
     member = await i.getMemberFromMention(user.id, i.message.guild.members) || i.message.member;
     user = member.user;
 }
 

var embed = new Discord.MessageEmbed()
      .setColor(colors.BG_COLOR)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }), i.website)
      .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`, client.user.displayAvatarURL({ format: "png", dynamic: true })).setTimestamp()
var fields = [ { name: "ID", value: `${user.id}`, inline: true },
        { name: "Accout created at", value: user.createdAt, inline: true},
        { name: "Bot", value: user.bot }]
    if (i.message.guild) {
      fields.push({ name: "Joined the server since", value: member.joinedAt, inline: true },
        { name: "Display name", value: member.displayName })
      if (member.displayColor) {
        fields.push({name: "Display color (Base 10)", value: member.displayColor,inline: true});
      }
      if(member.voice){
          
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
      userDB = await i.db.collection("users").getDoc({docID: user.id});
      if(userDB.desc){
        embed = embed.setDescription(userDB.desc);
      }
   fields.unshift({name: "COD Points", value: `${userDB.cp || 0} <:cp:744403130594230313>`, inline:true},
                                {name: "Cash", value: userDB.cash || 0, inline:true});
      try{
      embed = embed.setThumbnail(i.getItem("emblem", userDB.emblem).assets[0].asset).setImage(i.getItem("playercard", userDB.playercard).assets[0].asset); 
      } finally {
          
      }
    }
      let number = parseInt(i.argv.page);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = i.getPage(fields, 6, number);
               embed = embed.setFooter(i.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`, 2048));
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, field.value, field.inline);
                    }
            }

    i.message.channel.send(embed);
  }
};
