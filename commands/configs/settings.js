module.exports = {desc:"Update the server configurations in your server.", perms: 7}
module.exports.run = async (imports) => {
    const guild = await imports.db.getDoc("guilds", imports.message.guild.id);
    switch(imports.args.shift()){
        case "filter":
            {
            let option = imports.args.shift();
            if(!option) return imports.message.channel.send("The badwords filter for this server is set to " + guild.filter);
            switch(option){
                case "true":
                    await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {filter: true}});
                   return imports.message.channel.send("Nicely done.")                case "false":
                       await imports.db.updateDoc("guilds", imports.message.guild.id, {$set: {filter: false}});
                       return imports.message.channel.send("Nicely done.");
                       
                default:
                return imports.message.channel.send("`true` - Turn on the filter.\n `false` - Turn off the filter.")
            }

            
            }
        case "welcomechannel":
            
        case "welcomemessage":
        case "welcomeembed":
         {
             let option = imports.args.shift()
             if(!option) return imports.message.channel.send("The welcome embed for ")
         }
            default:
    }
}