module.exports = {
    desc: "Change the description of your server.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-desc--description",
    run: async (i) => {
        
       if(i.argv.d){
         if(typeof i.argv.d !== "string")   return i.message.channel.send(
             `The \`desc\` option must be a string.`
         );

        if(i.argv.d.length > 141) return i.message.channel.send(
            `Profile escriptions are limited to **141** characters.`
        );
        await db.collection("guilds").updateDoc(
            {
                docID: i.message.guild.id
            },
            {
                $set: {desc: i.argv.d}
            }
        );
        } else if(i.argv.rd && i.argv.rd === true){
            await db.collection("guilds").updateDoc(
                {docID: i.message.guild.id},
                {
                    $unset: {desc: ""}
                }
            );
        } else {
            const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
            return i.message.channel.send(
               `Current description: ${guildDB.desc || "none"}

                To change the description add the \`d\` option with the description you want.
                To get rid of the description. Set the \`rdn\` option to true.`
            );
        }
        return i.message.channel.send("Nicely done. Ez pz.");
        
       
    }
}