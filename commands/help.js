 const categories = require("../assets/configs/commands/categories.json").content;
 const commands = require("../assets/configs/commands/cmd-list.json").content;
module.exports = {
    name: "help",
    execute(imports){
        var embed = new imports.Discord.MessageEmbed()
        .setColor(require("../assets/configs/color.json").content.BG_COLOR)
        .setTitle(`${imports.client.user.username.split(" ")[0]} Help Command`)
        .setURL(`${process.env.WEBSITE}/commands`)
        .setAuthor(`${imports.client.user.username}`, imports.client.user.displayAvatarURL({dynamic: true, format: "png"}), process.env.WEBSITE)
        .setThumbnail(imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | For the time being, no commands are available due to some major optimizations in the main code.`)
        function getCategory(name){
            let modules =categories.filter(function(category){
                return category.name.toLowerCase(name) || category.id === name;
            })
            if(!modules.length) return;
            if(modules.length > 1) return;
            return modules[0];
        }
        if(getCategory(imports.args[0])){
            imports._.each(commands.filter(function(command){
                return command.category && command.category === getCategory(imports.args[0]).id || getCategory(imports.args[0]).id === "misc" && !command.category;
            }), function(value){
                embed = embed.addField(value.name, value.description);
            })
        } else if(imports.built_ins.getCommand(imports.args[0], {type: "module"})){
            imports._.each(imports.built_ins.getCommand(imports.args[0], {type: "module"}), function(value, key){
                if(key === "description"){
                    embed = embed.setDescription(value)
                } else {
                    embed = embed.addField(key, value, true);
                }
            })
        } else {
            
        imports._.each(categories, function (value) {
            embed = embed.addField(key, imports.built_ins.trim(`${value.description} ${commands.filter(function(command){
                if(value.id !== "misc")return command.category && command.category === value.id;
                if(value.id === "misc") return command.category && command.category === "misc" || !command.category;
                return false;
            }).length} commands available.`, 1048), true);

});
        }
        imports.message.channel.send(embed);
   
    }
}