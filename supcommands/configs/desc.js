module.exports = {
    desc: "Change the description of your server.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-desc--description",
    run: async (i) => {
        
       if(i.argv.desc){
         if(typeof i.argv.desc !== "string")   return i.message.channel.send(
             `The \`desc\` option must be a string.`
         );

        if(i.argv.desc.length > 141) return i.message.channel.send(
            `Profile escriptions are limited to **141** characters.`
        );
        await db.collection("guilds").updateDoc(
            {
                docID: i.message.guild.id
            },
            {
                $set: {desc: i.argv.desc}
            }
        );
        } else if(i.argv.remove_description && i.argv.remove_description === true){
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

                To change the description add the \`desc\` option with the description you want.
                To get rid of the description. Add the \`remove_description\` option like this: \`--remove_description\`.
                `
            );
        }
        return i.message.channel.send("Nicely done. Ez pz.");
        
       
    }
}