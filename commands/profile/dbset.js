module.exports = {
    name: "dbset",
    run: async (imports) => {
        if(!imports.args.length) return imports.message.react("❌");
        const form = imports.args.join(" ").toLowerCase().split(" | ");
        if(form[0] && form[0].toLowerCase() !== "-current"){
            const emblem = imports.getItem('emblem',form[0]);
            if(!emblem)return imports.message.react("❌");
            await imports.db.updateDoc('users', imports.message.author.id,  {$set: {"emblem": emblem.id}})
        }    
        if(form[1] && form[1].toLowerCase() !== "-current"){
            const playercard = imports.getItem('playercard',form[1]);
            if(!playercard)return imports.message.react("❌")

            await imports.db.updateDoc('users', imports.message.author.id, {$set: { "playercard": playercard.id}})
        }    
        return imports.message.react("✔");
    }
}   