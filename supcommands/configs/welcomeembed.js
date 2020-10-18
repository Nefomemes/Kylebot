module.exports = {
    desc: "Enable or disable welcomeembed.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomeembed-toggle",
    run: async (i) => {
        var bool = _.isUndefined(i.argv.embed) || _.isNull(i.argv.embed);

       if(!bool && i.argv.embed == true){
        await db.collection("guilds").updateDoc({docID: i.message.guild.id}, 
            {$set: {welcomeEmbed: true}});
       }  else if(!bool && i.argv.embed === false){
        await db.collection("guilds").updateDoc({docID: i.message.guild.id}, 
            {$unset: {welcomeEmbed: ""}});
       } else {
           const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
           var i;
           if(guildDB.welcomeEmbed){
            i = "Currently welcome embed is turned on. Turn it off by adding `--embed=false`.";
           }  else {
               i = "Currently welcome embed is turned off. Turn it on by adding `--embed=true`.";

           }
        return   i.message.channel.send(`${i}`);}
        return i.message.channel.send("Nicely done. Ez pz.");
    }

}