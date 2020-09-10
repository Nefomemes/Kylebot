module.exports = {
  name: "server",
  run: async (imports) => {
    const guild = imports.message.guild;
    if (!guild) {
      imports.args = ["server"];

      return imports.client.commands.get("help").execute(imports).catch(error => {
        imports.message.channel.send("An error occured! " + error);
      });
    }
    const guildDB = imports.db.getDoc('guilds', guild.id);

var embed = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setTitle(guild.name)
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
      .setThumbnail(guild.iconURL({ format: "png", dynamic: true }))
      .setTimestamp()
      .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))

 var fields = [{ name: "Owner", value: `<@!${guild.ownerID}>`, inline: true },
        { name: "Server created at", value: new Date(guild.createdTimestamp).toUTCString(), inline: true },
        { name: "Server region", value: guild.region, inline: true },
        { name: "Members", value: guild.memberCount, inline: true },
        { name: "Booster members", value: guild.premiumSubscriptionCount, inline: true },
        { name: "Channels", value: guild.channels.cache.size, inline: true },
        { name: "Categories", value: guild.channels.cache.filter(function (channel) { return channel.type && channel.type === "category" }).size, inline: true },
        { name: "Text channels", value: guild.channels.cache.filter(function (channel) { return channel.type && channel.type === "text"; }).size, inline: true },
        { name: "Voice channels", value: guild.channels.cache.filter(function (channel) { return channel.type && channel.type === "voice" }).size, inline: true },
        { name: "News channels", value: guild.channels.cache.filter(function (channel) { return channel.type && channel.type === "news" }).size, inline: true },
        { name: "Store channels", value: guild.channels.cache.filter(function (channel) { return channel.type && channel.type === "store" }).size, inline: true },
        { name: "Roles", value: guild.roles.cache.size, inline: true },
        { name: "Emojis", value: guild.emojis.cache.size, inline: true },
        { name: "Animated emojis", value: guild.emojis.cache.filter(function (emoji) { return emoji.animated && emoji.animated === true; }).size, inline: true },
        { name: "Non-animated emojis", value: guild.emojis.cache.filter(function (emoji) { return emoji.animated && emoji.animated === false; }).size, inline: true },
        { name: "Boost Tier", value: guild.premiumTier, inline: true },
        { name: "Verification level", value: guild.verificationLevel, inline: true },
        { name: "Explicit content filter", value: guild.explicitContentFilter, inline: true },
        { name: "MFA level", value: guild.explicitContentFilter, inline: true }]

if (guild.systemChannel) {
      fields.push({name:"System channel", value: guild.systemChannel, inline: true})
    }
 if(guild.rulesChannel){
   fields.push({name:"Rules channel", value: guild.rulesChannel, inline: true})
   }
    if (guild.widgetChannel) {
      fields.push({name: "Widget channel", value: guild.widgetChannel, inline: true})
    }
    if(guildDB.desc){
      embed = embed.setDescription(guildDB.desc);
    } else if(guild.description){
      embed = embed.setDescription(guild.description);
    } 
    
           let number = parseInt(imports.args.pop());
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
            embed = embed.setFooter(imports.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`,2048))
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField((field.name || "unknown").toString(), "||" + (field.value || "unknown").toString() + "||", field.inline);
                    }
            }
    imports.message.channel.send(embed);
  }
};
