module.exports = {
    desc: "Enable or disable welcomeembed.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomeembed-toggle",
    run: async (i) => {
        var opt = i.args.shift();
        if (!opt) return i.message.channel.send('Not enough parameters, sir.');
        switch (opt.toLowerCase()) {
            case 'on':
                opt = true;
                break;
            case 'off':
                opt = false;
                break;
            case 'false':
                opt = false;
                break;
            case 'true':
                opt = true;
                break;
            default:
                return i.message.channel.send('Invalid switch argument.');
        }
        await db
            .collection('guilds')
            .updateDoc(
                { docID: i.message.guild.id },
                { $set: { welcomeEmbed: opt } }
            );
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}