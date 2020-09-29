module.exports = {
    desc: "Change your profie emblem.",
    run: async (i) => {
        const name = i.args.shift();
        if(!name) return i.message.react("❌");
        const emblem = i.getItem("emblem", name);
        if(!emblem) return i.message.react("❌");
        const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
        if(!userDB.emblems || !userDB.emblems.includes(emblem.id)) return i.message.channel.send("You doesn't own this emblem.");
        await i.db.collection("users").updateDoc({docID: i.message.author.id}, {$set: {"emblem": emblem.id}});
        return i.message.channel.send("Nicely done. Ez pz.");
    }
}