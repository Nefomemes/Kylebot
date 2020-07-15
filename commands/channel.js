module.exports = {
    name: "channel",
    execute(imports){
     return;
        var channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel;
    
        if(channel) return message.reply("that isn't a valid channel!");




    }
}