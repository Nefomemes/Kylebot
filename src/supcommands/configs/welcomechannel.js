module.exports = {
    desc: "Update your welcome channel.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomechannel-welcomechannel",
    run: async (i) => {
        if(i.argv.c){
            const channel = i.getChannelFromMention(i.argv.c, i.message.guild.channels);
            if (!channel) return i.message.channel.send("Invalid channel.");
            if (!channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !channel.permissionsFor(client.user.id).has("VIEW_CHANNEL")) return i.message.channel.send("Some permissions needed are missing from this channel. Try again, sir.");
            await db.collection("guilds").updateDoc({ docID: i.message.guild.id }, { $set: { welcomeChannel: channel.id } });
        } else if(i.argv.rc && i.argv.rc === true){
            await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$unset: {welcomeChannel: ""}});
        } else {
            const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});

            return i.message.channel.send(
                `Current welcome channel: ${guildDB.welcomeChannel || "none"}

                To change the channel, add the \`c\` option with the channel you want it to be the welcome channel.
                To get rid of it, set the \`rc\` option to true.`
            )
        }
      
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}