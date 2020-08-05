module.exports = {
    name:"filter",
    run: async (imports) => {
        if(imports.args[0] === "on"){
            imports.db.updateDoc('guilds', imports.message.guild.id, {$set: {filter: true}});
            return imports.message.react("✔");
        } else if(imports.args[0] === "off"){
            imports.db.updateDoc('guilds', imports.message.guild.id, {$set: {filter: false}});
            return imports.message.react("✔");
        } else {
            return imports.message.react("❌");
        }
    }
}