module.exports = {
    desc: "Enable or disable welcomeembed.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomeembed-toggle",
    run: async (i) => {
        var bool = _.isUndefined(i.argv.e) || _.isNull(i.argv.e);

       if(!bool && i.argv.e == true){
        await db.collection("guilds").updateDoc({docID: i.message.guild.id}, 
            {$set: {welcomeEmbed: true}});
       }  else if(!bool && i.argv.e === false){
        await db.collection("guilds").updateDoc({docID: i.message.guild.id}, 
            {$unset: {welcomeEmbed: ""}});
       } else {
           const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
           var i;
           if(guildDB.welcomeEmbed){
            i = "Currently welcome embed is turned on. Turn it off by explicitly setting the `e` parameter to false.";
           }  else {
               i = "Currently welcome embed is turned off. Turn it on by explicitly setting the `e` parameter to true.";
           }
        return   i.message.channel.send(`${i}`);
       	
       }
        return i.message.channel.send("Nicely done. Ez pz.");
    }

}