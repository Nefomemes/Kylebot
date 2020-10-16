module.exports = {
    desc: "Change the description of your server.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-desc--description",
    run: async (i) => {
        var opt = i.args.join();
        if (!opt) return i.message.channel.send('Not enough parameters, sir.');
        if (opt.toLowerCase === '-none') {
            opt = null;
        } else {
            opt = i.trim(opt.toString(), 41);
        }
        await db
            .collection('guilds')
            .updateDoc({ docID: i.message.guild.id }, { $set: { desc: opt } });
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}