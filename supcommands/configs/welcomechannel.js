module.exports = {
    desc: "Update your welcome channel.",
    run: async (i) => {
        const channel = i.getChannelFromMention(i.args.shift(), i.message.guild.channels);
        if (!channel) return i.message.channel.send("Invalid channel.");
        if (!channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !channel.permissionsFor(client.user.id).has("VIEW_CHANNEL")) return i.message.channel.send("Some permissions needed are missing from this channel. Try again, sir.");
        await db.collection("guilds").updateDoc({ docID: i.message.guild.id }, { $set: { welcomeChannel: channel.id } });
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}