module.exports = {
    desc: "Modify your profile description.",
    run: async (i) => {
        var opt = i.args.join(" ");
        if (!opt) return i.message.channel.send('Not enough parameters, sir.');
        
        if (opt.toLowerCase === '-none'){
            opt = null;
        } else {
            opt = i.trim(opt.toString(), 141);
        }
        await i.db
            .collection('users')
            .updateDoc({ docID: i.message.author.id }, { $set: { desc: opt } });
            return i.message.channel.send("Nicely done. Ez pz.");
    }
}