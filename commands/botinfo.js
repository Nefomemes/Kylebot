module.exports = {
  name: "botinfo",
    run: async(imports)=> {
    try {
   
        const uptime = imports.client.uptime /3600000;
        var embedping = new imports.Discord.MessageEmbed()
          .setColor(require("../assets/configs/color.json").content.BG_COLOR)
          .setTitle(imports.client.user.username.split(" ")[0])
          .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setDescription(`Invite the bot [here!](https://web.nefomemes.repl.co/kylebot/invite)\n\nFunfact: You wont be able to invite the bot since I made it private.`)
          .addFields(
            {name: "Bot's name", value: `${imports.client.user.username}#${imports.client.user.discriminator}`},
            {name: "Bot's owner", value: `Nefomemes#3927`, inline: true},
            {name: "Discord API ping", value: `${imports.client.ws.ping}ms`, inline: true},
            {name: "Bot's ping", value: `${Date.now() - imports.message.createdTimestamp}ms`, inline: true},
            {name: "Bot's ID", value: imports.client.user.id, inline: true},
            {name: "Created at", value: imports.client.user.createdAt, inline: true},
            {name: "Connected to the Discord API since", value: imports.client.readyAt, inline: true},
            {name: "Connected to the Discord API for", value: `${(imports.client.uptime / 3600000).toFixed(2)} hours`, inline: true},
            {name: "Servers joined", value: `${imports.client.guilds.cache.size} servers`, inline: true},
            {name: "Users cached (not all users due to Discord limitations)", value: `${imports.client.users.cache.size} users`, inline: true},
            {name: "Channels", value: `${imports.client.channels.cache.size}`, inline: true}
          )
          .setThumbnail(
              imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setTimestamp()
          .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`,   imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          );
            if(imports.message.guild){
              embedping.addFields({name:"Joined the server since", value: imports.message.guild.me.joinedAt, inline: true},
                                  {name: "Display name", value: imports.message.guild.me.displayName, inline: true},
                                  {name: "Members cached (not all due to Discord limitations)", value: `${imports.message.guild.members.cache.size} members`, inline: true },
                                  {name: "Members cached percentage", value: `${((imports.message.guild.members.cache.size / imports.message.guild.memberCount) * 100).toFixed(2)}%`, inline: true})
            }
        imports.message.channel.send(embedping)
        

    } catch (error) {
      imports.message.channel.send(error);
    }
  }
};
