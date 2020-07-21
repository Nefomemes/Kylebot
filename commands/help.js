 const categories = require("../assets/configs/commands/categories.json").content;
 const commands = require("../assets/configs/commands/cmd-list.json").content;
module.exports = {
    name: "help",
    run: async (imports) => {
       
        var embed = new imports.Discord.MessageEmbed()
        .setColor(imports.colors.BG_COLOR)
        .setTitle(`${imports.client.user.username.split(" ")[0]} Help Command`)
        .setURL(`${process.env.WEBSITE}/commands`)
        .setAuthor(`${imports.client.user.username}`, imports.client.user.displayAvatarURL({dynamic: true, format: "png"}), process.env.WEBSITE)
        .setThumbnail(imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | For the time being, no commands are available due to some major optimizations in the main code.`, imports.client.user.displayAvatarURL({format:"png", dynamic: true}))
        function getCategory(name){
            if(!name)return;
            let modules =categories.filter(function(category){
                return category.name.toLowerCase() === name.toLowerCase() || category.id === name;
            })
            if(!modules.length) return;
            if(modules.length > 1) return;
            return modules[0];
        }
        if(getCategory(imports.args[0])){
            const value = getCategory(imports.args[0]);
              if(value.id){
                    embed = embed.setDescription(imports.built_ins.trim(`Insidely called \`${value.id}\`.`, 2048))
                }
                var descr = value.description || "No description specified.";
                const desscr = commands.filter(function(command){
                        
                if(command.disabled && command.disabled === true) return false;
                if(value.id !== "misc")return command.category && command.category === value.id;
                if(value.id === "misc") return command.category && command.category === "misc" || !command.category;
                return false;
            }).length
              if(embed.description){
                  embed = embed.setDescription(imports.built_ins.trim(`${embed.description}\n\n ${descr}\n\n ${desscr} commands available.`, 2048))
                } else {
                    embed = embed.setDescription(imports.built_ins.trim(`${descr}\n\n ${desscr} commands available.`, 2048));
                }
            
            imports._.each(commands.filter(function(command){
              
                if(command.disabled && command.disabled === true)return false;
                return command.category && command.category === getCategory(imports.args[0]).id || getCategory(imports.args[0]).id === "misc" && !command.category;
            }), function(value){
                embed = embed.addField(value.name || "Classified", value.description || "No description given.");
            })
        } else if(imports.built_ins.getCommand(imports.args[0], {type: "module"})){
            imports._.each(imports.built_ins.getCommand(imports.args[0], {type: "module"}), function(value, key){
                if(key === "description"){
                    embed = embed.setDescription(value)
                } else {
                    embed = embed.addField(key || "Classified. Wait for further instructions.", value || "No description given.", true);
                }
            })
        } else {
            
        imports._.each(categories, function (value) {
            embed = embed.addField(value.name, imports.built_ins.trim(`Insidely called \`${value.id}\`.\n \n ${value.description} \n\n ${commands.filter(function(command){
                if(command.disabled && command.disabled === true) return false;
                if(value.id !== "misc")return command.category && command.category === value.id;
                if(value.id === "misc") return command.category && command.category === "misc" || !command.category;
                return false;
            }).length} commands available.`, 1048), true);  
            embed = embed.setImage("https://i.imgur.com/q3EWSPl.gif");
            embed = embed.setDescription("Here are the list of all available commands. If you found any bugs, need help, or want to tell us your feedbacks, join our [support server here.](https://web.nefomemes.repl.co/kylebot/support)")
});
        }
        imports.message.channel.send(embed);
   
    }
}