const { dbClient } = require("../assets/utils/database");

module.exports = {
    name:"filter",
    run: async (imports)=> {
        if(!imports.args.length){
            imports.args = ["filter"];
            return imports.client.commands.get("help").run(imports).catch(error => {
                throw error;
            })
        }
        if(imports.args[0].toLowerCase() === "on") {
            db.updateGuild(imports.message.guild.id, {bd_filter: true});
            return imports.message.react("✔");

        } else if(imports.args[0].toLowerCase() === "off"){
            db.updateGuild(imports.message.guild.id, {bd_filter: false});
            return imports.message.react("✔");
        } else {
            return imports.message.react("❌");
        }
  
    }
}