 const categories = require("../../assets/commands/categories").content;

module.exports = {
    name: "help",
    run: async (imports) => {
        const form = imports.args.shift();
        var embed = new imports.Discord.MessageEmbed()
            .setColor(imports.colors.BG_COLOR)
            .setTitle(`${imports.client.user.username.split(" ")[0]} Help Command`)
            .setURL(`${imports.website}/commands`)
            .setAuthor(`${imports.client.user.username}`, imports.client.user.displayAvatarURL({ dynamic: true, format: "png" }), process.env.WEBSITE)
            .setThumbnail(imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setTimestamp()
            .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
         var fields = [];
      var commands = imports.client.commands.cache.map(i => i);
            function getCategory(name) {
            if (!name) return;
            let modules = categories.filter(function (category) {
                return category.name.toLowerCase() === name.toLowerCase() || category.id === name;
            })
            if (!modules.length) return;
            if (modules.length > 1) return;
            return modules[0];
        }
        function filterTheCommands(category){
            category = getCategory(category.toLowerCase() || "misc").id;
            return (command) => {
                if (command.disabled && command.disabled === true) return false;
                if(category === "misc")return !command.category || command.category === "misc"; 
                return command.category && command.category === category;
            }
        }
        if(imports.getCommand(form, imports.client)){

         let command = imports.getCommand(form, imports.client);
            if(imports.args[0] && imports.args[0].toLowerCase() === "-args" && imports.getCommand(form, imports.client).args && imports.getCommand(form, imports.client).args.constructor === Array){
             imports.args.shift();
                
                for(let arg of command.args){
                    let optional;
                    if(arg.optional && arg.optional === true){
                        optional = "This argument is ||optional||.";
                    } else if(arg.optional && arg.optional){
                        optional = "This argument is ||mandatory||.";
                    } else {
                     optional = arg.optional || "This argument is ||¯\\_(ツ)_/¯||.";
                    }

                    fields.push({name: arg.name || "Unknown", value: imports.trim((arg.desc || "<redacted> ") + "\n\n" + optional, 1024), inline: true});
                
}
            
                            
                
      
            } else {
                 
                imports._.each(command, function(value, key){
                    if(key.toLowerCase().startsWith("desc"))return embed = embed.setDescription("||" + value.toString() + "||");
                    if(key.toLowerCase() === "args" ) value = "Use ||\"-args\" ||to view arguments, yeah.";
                    if(key === 'run')return;
                    fields.push({name: key, value: value, inline: true});
                })
            }
  
    
        } else if(getCategory(form)){
          
               const commands = filterTheCommands(getCategory(form).id);
      
            commands.forEach((command) => {
             
        let name = imports.client.commands.cache.findKey(i => i === command);
        fields.push({name: name || "Unknown", value: "||" + command.desc || "No description" + "||", inline: true});
            });
        } else {
        embed = embed.setImage(imports.brandingbg);
       embed = embed.setDescription("||Kylebot|| is currently the ||first|| Call of Duty ||roleplay|| Discord bot.")
 
            categories.forEach((category) => {
               
      
                fields.push({name: category.name, value: imports.trim(`ID: ||\`${category.id}\`|| \n||${category.desc || "No description."}|| \n||${commands.filter(filterTheCommands(category.id)).length}|| commands available.`, 1024), inline:true});
            })
        
        }
     let number = parseInt(imports.args[0]);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField(field.name, field.value, field.inline);
                    }
            }
       return imports.message.channel.send(embed);
    }
}
