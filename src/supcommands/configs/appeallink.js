module.exports = {
    run: async (i) => {
        if(i.argv.l){
        if(typeof i.argv.l !== "string") return i.message.channel.send(
            "The `l` option must be a string."
        );
        if(i.argv.l.length > 141) return i.message.channel.send(
            "To save our database recourses. Appeal links are limited to 141 characters. You can always use a third party service like bit.ly or short.cc to make it shorter."
        );
        await db.collection("guilds").updateDoc({docID: i.message.guild.id}, 
            {$set: {appealLink: i.argv.l}});
            return i.message.channel.send("Nicely done. Ez pz.");
        } else if(i.argv.rl && i.argv.rl === true){
            await db.collection("guilds").updateDoc(
                {docID: i.message.guild.id},
                {$unset: {appealLink: ""}}
            )
        } else {
            const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
            return i.message.channel.send(
                `Current appeal link: ${guildDB.appealLink || "none"}
                 
                 To change the appeal link add the \`l\` option with the link as it's value.
                 To get rid of the appeal link. Set the \`rl\` option to true.`
                 );
        }
        return i.message.channel.send("Nicely done. Ez pz.")
        }
}