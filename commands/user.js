module.exports = {
  name: "user",
  run: async (imports) => {
    var user, member, userDB;
    if (imports.message.guild) {
      member = imports.getMemberFromMention(imports.args[0], imports.message) || imports.message.member;
      user = member.user;
    } else {
      user = imports.message.author;
    }
 

    var embed = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setAuthor(imports.client.user.username.split(" ")[0], imports.client.user.displayAvatarURL({ format: "png", dynamic: true }), process.env.WEBSITE)
      .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
      .addFields(
        { name: "ID", value: `${user.id}`, inline: true },
        { name: "Accout created at", value: user.createdAt },
        { name: "Bot", value: user.bot })
      .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))

    if (imports.message.guild) {
      embed.addFields({ name: "Joined the server since", value: member.joinedAt },
        { name: "Display name", value: member.displayName })
      if (member.displayColor) {
        embed.addField("Display color (Base 10)", member.displayColor, true);
      }
      if (member.displayHexColor) {
        embed.setColor(member.displayHexColor)
        embed.addField("Display color(Hex)", member.displayHexColor, true);
      }
      if (member.premiumSince) {
        embed.addField("Boosting the server since", member.premiumSince);
      }
      if (member.roles) {
        embed.addField("Highest roles", member.roles.highest);
        if (member.roles.hoist) {
          embed.addField("Hoist role (the role that separate the user from other online users)", member.roles.hoist, true);
        }
      }
    }
    if(!user.bot){
      userDB = imports.db.getDoc('users', user.id);
      if(userDB.desc){
        embed.setDescription(userDB.desc);
      }
      if(userDB.cash){
        embed.addField("Cash", userDB.cash, true);
      }
      
    }
    imports.message.channel.send(embed);
  }
};
