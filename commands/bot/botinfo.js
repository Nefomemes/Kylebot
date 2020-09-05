module.exports = {
  name: "botinfo",
    run: async(imports)=> {
    try {
   
        const uptime = imports.client.uptime /3600000;
        var embed = new imports.Discord.MessageEmbed()
          .setColor(imports.colors.BG_COLOR)
          .setTitle(imports.client.user.username)
          .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setThumbnail(
              imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setTimestamp()
          .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`,   imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          );
      var fields = [
            {name: "Bot's name", value: `${imports.client.user.username}#${imports.client.user.discriminator}`},
            {name: "Bot's owner", value: `Nefomemes`, inline: true},
            {name: "Discord API ping", value: `${imports.client.ws.ping}ms`, inline: true},
            {name: "Bot's ping", value: `${Date.now() - imports.message.createdTimestamp}ms`, inline: true},
            {name: "Bot's ID", value: imports.client.user.id, inline: true},
            {name: "Created at", value: new Date(imports.client.user.createdTimestamp).toUTCString(), inline: true},
            {name: "Connected to the Discord API since", value: new Date(imports.client.readyTimestamp).toUTCString(), inline: true},
            {name: "Connected to the Discord API for", value: `${(imports.client.uptime / 3600000).toFixed(2)} hours`, inline: true},
            {name: "Servers joined", value: `${imports.client.guilds.cache.size} servers`, inline: true},
            {name: "Users cached (not all users due to Discord limitations)", value: `${imports.client.users.cache.size} users`, inline: true},
            {name: "Channels", value: `${imports.client.channels.cache.size}`, inline: true}
        ];
            if(imports.message.guild){
              fields.push({name:"Joined the server since", value: imports.message.guild.me.joinedAt, inline: true}, {name: "Display name", value: imports.message.guild.me.displayName, inline: true}, {name: "Members cached (not all due to Discord limitations)", value: `${imports.message.guild.members.cache.size} members`, inline: true }, {name: "Members cached percentage", value: `${((imports.message.guild.members.cache.size / imports.message.guild.memberCount) * 100).toFixed(2)}%`, inline: true})
            }
      let number = parseInt(imports.args[0]);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, "||" + field.value + "||", true);
                    }
            }
       return imports.message.channel.send(embed)
        

    } catch (error) {
      imports.message.channel.send(error);
    }
  }
};
