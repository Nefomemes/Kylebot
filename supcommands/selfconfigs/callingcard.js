module.exports = {
    desc: "Change the calling card you use.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/selfconfigs.md#prefixselfconfigs-callingcard-callingcard-",
    run: async (i) => {
        if(!i.argv.c) return i.message.channel.send("Add the `c` option with the calling card you want to use to change your calling card.");
        const name = i.argv.c;
        if(!name) return i.message.chanel.si.message.channel.send("Change your equipped calling card by setting the `c` option wih the name of your calling card.");
        if(typeof name !== "string") return i.message.channel.send("The `c` option must be a string.");
        const playercard = i.getItem('playercard', name);
        if(!playercard) return i.message.react("❌");
        const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
        if(!userDB.playercards || !userDB.playercards.includes(playercard.id) || playercard.default) return i.message.channel.send("You doesn't own this calling card.");
        await i.db.collection("users").updateDoc({docID: i.message.author.id}, {$set: { "playercard": playercard.id}});
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}