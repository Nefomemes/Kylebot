module.exports.run = async (imports) => {
      
        var channel;
      if(imports.message.guild){
            imports.getChannelFromMention(imports.args[0]);
            }
if(channel) imports.args.shift();
    if(!channel) channel = imports.message.channel;
    
    var embed = new imports.Discord.MessageEmbed()
    .setColor(imports.colors.BG_COLOR)
   .setTitle("Channel Insights - Kylebot")
    .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true})).setTimestamp()
    .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
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
    
       
                 let number = parseInt(imports.args[0]);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
               embed = embed.setFooter(imports.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`,2048));
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, field.value, field.inline);
                    }
            }
return imports.message.channel.send(embed)
              
    }
    
