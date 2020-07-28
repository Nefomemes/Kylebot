const dbUtils = require("../assets/utils/database");

module.exports = {
    name: "dbset",
    run: async (imports) => {
        if(!imports.args.length){
            imports.args = ["dbset"];
            return imports.client.commands.get("help").run(imports).catch(error => {
                throw error;
            })
        }
        const form = imports.args.join(" ").split(" | ");
        if(form[0] && form[0].toLowerCase() !== "--current"){
            if(!imports.getEmblem(form[0]))return imports.message.react("❌")

            await dbUtils.updateUser(imports.message.author.id,  { "emblem": imports.getEmblem(form[0].toLowerCase()).id})
        }    
        if(form[1] && form[1].toLowerCase() !== "--current"){
            if(!imports.getPlayercard(form[1]))return imports.message.react("❌")

            await dbUtils.updateUser(imports.message.author.id, { "playercard": imports.getPlayercard(form[1].toLowerCase()).id})
        }    
        return imports.message.react("✔")
 
    }
}   