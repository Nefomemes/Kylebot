module.exports = {
    name: "dbset",
    run: async (imports) => {
        if(!imports.args.length) return imports.message.react("❌");
        const form = imports.args.join(" ").split(" | ");
        if(form[0] && form[0].toLowerCase() !== "--current"){
            if(!imports.getEmblem(form[0]))return imports.message.react("❌")

            await imports.db.updateDoc('users', imports.message.author.id,  {$set: {"emblem": imports.getEmblem(form[0].toLowerCase()).id}})
        }    
        if(form[1] && form[1].toLowerCase() !== "--current"){
            if(!imports.getPlayercard(form[1]))return imports.message.react("❌")

            await imports.db.updateDoc('users', imports.message.author.id, {$users: { "playercard": imports.getPlayercard(form[1].toLowerCase()).id}})
        }    
        return imports.message.react("✔")
    }
}   