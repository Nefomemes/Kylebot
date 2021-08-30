module.exports.run = async (i) => {
      
        var channel;
      if(i.message.guild){
            i.getChannelFromMention(i.argv.c, i.message.guild.channels);
            }

    if(!channel) channel = i.message.channel;
    
    var embed = new Discord.MessageEmbed()
    .setColor(colors.BG_COLOR)
   .setTitle("Channel Insights - Kylebot")
    .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png", dynamic: true})).setTimestamp()
    .setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`, i.client.user.displayAvatarURL({format: "png", dynamic: true}))
     var fields       =   [{name: "Channel ID", value: channel.id, inline: true},
                           {name: "Created at", value: new Date(channel.createdTimestamp).toUTCString(), inline: true},
                           {name: "Type", value: channel.type, inline: true}];
if(channel.name){
      fields.push({name: "Name", value: channel.name, inline: true});
      }
  if(channel.topic){
        embed = embed.setDescription(channel.topic);
        }
        
    if(channel.rateLimitPerUser){
        fields.push({name: "Slowmode", value: channel.rateLimitPerUser, inline: true});
    }
    
       
                 let number = parseInt(i.argv.p);
            if (Number.isNaN(number)){
                number = 1;
            }
            let page = i.getPage(fields, 6, number);
               embed = embed.setFooter(i.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`,2048));
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, field.value, field.inline);
                    }
            }
return i.message.channel.send(embed)
              
    }
    
