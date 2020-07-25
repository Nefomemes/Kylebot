module.exports = {
  name: "server",
  run: async(imports) => {
    const guild = imports.message.guild;
    if(!guild){
      imports.args = ["server"];

      return imports.client.commands.get("help").execute(imports).catch(error => {
        imports.message.channel.send("An error occured! " + error);
      });
    }
   var embed = new imports.Discord.MessageEmbed()
   .setColor(imports.colors.BG_COLOR)
   .setTitle(guild.name)
   .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
   .setThumbnail(guild.iconURL({format: "png", dynamic:true}))
   .addFields({name:"Owner", value: `<@!${guild.ownerID}>`, inline: true},
              {name:"Server created at", value: guild.createdAt, inline: true},
              {name:"Server region", value: guild.region, inline: true},
              {name:"Members", value: guild.memberCount, inline: true},
               {name:"Booster members", value: guild.premiumSubscriptionCount, inline: true},
              {name:"Channels", value: guild.channels.cache.size, inline: true},
              {name:"Categories", value: guild.channels.cache.filter(function(channel){return channel.type && channel.type === "category"}).size, inline: true},
              {name: "Text channels", value: guild.channels.cache.filter(function(channel){return channel.type && channel.type === "text";}).size, inline: true},
              {name: "Voice channels", value: guild.channels.cache.filter(function(channel){return channel.type && channel.type === "voice"}).size, inline: true},
              {name: "News channels", value: guild.channels.cache.filter(function(channel){return channel.type && channel.type === "news"}).size, inline: true},
              {name: "Store channels", value: guild.channels.cache.filter(function(channel){return channel.type && channel.type === "store"}).size, inline: true},
              {name:"Roles", value: guild.roles.cache.size, inline: true},
              {name:"Emojis",value: guild.emojis.cache.size, inline: true},
              {name: "Animated emojis", value: guild.emojis.cache.filter(function(emoji){return emoji.animated && emoji.animated === true;}).size, inline: true},
              {name:"Non-animated emojis", value: guild.emojis.cache.filter(function(emoji){return emoji.animated && emoji.animated === false;}).size, inline: true},
              {name: "Boost Tier", value: guild.premiumTier, inline: true},
              {name: "Verification level", value: guild.verificationLevel, inline: true},
              {name: "Explicit content filter", value: guild.explicitContentFilter, inline: true},
              {name: "MFA level", value: guild.explicitContentFilter, inline: true}
              )
    .setTimestamp()
    .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
    if(guild.systemChannel){
      embed = embed.addField("System channel", guild.systemChannel, true)
    } 
    if(guild.widgetChannel){
      embed = embed.addField("Widget channel", guild.widgetChannel, true)
    }
    if(guild.description){
      embed = embed.setDescription(guild.description);
    }else if(guild.id === "730363347400130612"){
      embed = embed.setDescription("The official Discord support server for " + imports.client.user.username.split(" ")[0] + ".")
    }

imports.message.channel.send(embed);
  }
};
