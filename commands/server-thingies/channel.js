module.exports.run = async (imports) => {
      
        var channel = imports.getChannelFromMention(imports.args[0]);
if(channel) imports.args.shift();
    if(!channel) channel = imports.message.channel;
    
    var embed = new imports.Discord.MessageEmbed()
    .setColor(imports.colors.BG_COLOR)
   .setTitle("Channel Insights - Kylebot")
    .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true})
   .setTimestamp()
    .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
               
         
       
               
              

    }
    
