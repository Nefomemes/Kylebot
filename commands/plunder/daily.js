module.exports = {
    "name":"daily",
    "run":async (imports) => {
        const user = await imports.db.getDoc('users', imports.message.author.id);
        const interval = user.dailyClaim;
        const remaining = 86400000 - (imports.message.createdTimestamp - interval);
        if(interval && remaining > 0)return imports.message.channel.send("Ugh, no. You already claimed it. Come back another day.");
        imports.db.updateDoc('users', imports.message.author.id, {$inc: {cash: 100}, $set: {dailyClaim: imports.message.createdTimestamp}});
        return imports.message.channel.send("You have claimed your daily dose of one hundred bucks. Come back another day.");
    }
}