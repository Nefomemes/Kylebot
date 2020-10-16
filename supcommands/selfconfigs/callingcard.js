module.exports = {
    desc: "Change the calling card you use.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/selfconfigs.md#prefixselfconfigs-callingcard-callingcard-",
    run: async (i) => {
        const name = i.args.shift();
        if(!name) return i.message.react("❌");
        const playercard = i.getItem('playercard', name);
        if(!playercard) return i.message.react("❌");
        const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
        if(!userDB.playercards || !userDB.playercards.includes(playercard.id) || playercard.default) return i.message.channel.send("You doesn't own this calling card.");
        await i.db.collection("users").updateDoc({docID: i.message.author.id}, {$set: { "playercard": playercard.id}});
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}