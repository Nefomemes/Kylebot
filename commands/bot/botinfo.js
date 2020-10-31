module.exports = {
	"category":"bot",
	"aliases":["ping"],
run: async (i) => {
 
   
        const uptime = client.uptime /3600000;
        var embed = new Discord.MessageEmbed()
          .setColor(colors.BG_COLOR)
          .setTitle(client.user.username)
          .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setThumbnail(
           client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setTimestamp()
          .setFooter(i.getFooter(),   client.user.displayAvatarURL({format: "png", dynamic: true})
          );
      var fields = [
            {name: "Bot's name", value: `${client.user.username}#${client.user.discriminator}`},
            {name: "Bot's owner", value: `Nefomemes`, inline: true},
            {name: "Discord API Web Socket connection latency", value: `${client.ws.ping}ms`, inline: true},
            {name: "Bot's ID", value: client.user.id, inline: true},
            {name: "Created at", value: new Date(client.user.createdTimestamp).toUTCString(), inline: true},
            {name: "Connected to the Discord API since", value: new Date(client.readyTimestamp).toUTCString(), inline: true},
            {name: "Connected to the Discord API for", value: `${(client.uptime / 3600000).toFixed(2)} hours`, inline: true},
            {name: "Servers cached", value: `${client.guilds.cache.size} servers`, inline: true},
            {name: "Users cached", value: `${client.users.cache.size} users`, inline: true},
            {name: "Channels cached", value: `${client.channels.cache.size} channels`, inline: true}
        ];
            if(i.message.guild){
              fields.push({name:"Joined the server since", value: new Date(i.message.guild.me.joinedTimestamp).toUTCString(), inline: true}, {name: "Display name", value: i.message.guild.me.displayName, inline: true}, {name: "Members cached", value: `${i.message.guild.members.cache.size} members`, inline: true }, {name: "Members cached percentage", value: `${((i.message.guild.members.cache.size / i.message.guild.memberCount) * 100).toFixed(2)}%`, inline: true})
              if(i.message.guild.me.voice.channelID){
                  
                  const vc = await i.getChannelFromMention(i.message.guild.me.voice.channelID);
                  if(channel && channel.type === "voice"){
                      fields.push({name: "Connected to", value: channnel.name, inline: true})
                  }
                      
                  
                  
              } else{
             fields.push({name: "Connected to", value: "Not connected to any VC.", inline: true});
        
              }
            }
           
      let number = parseInt(i.argv.p);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = i.getPage(fields, 4, number);
            embed = embed.setFooter(i.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`,2048))
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField((field.name || "unknown").toString(), (field.value || "unknown").toString(), field.inline);
                    }
            }
       return i.message.channel.send(embed)
        

  }
}