module.exports.run = async (imports) => {
var embed = new imports.Discord.MessageEmbed()
.setColor(imports.colors.BG_COLOR)
.setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({dynamic: true, format: "png"}))
.setThumbnail(imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
.setFooter("Prefix: " + imports.prefix + " | " + imports.getRandomFunfact(), imports.client.user.displayAvatarURL({"dynamic": true, "format": "png"}))
.setTimestamp()


var fields = [];
let categories = require(require("path").join(process.cwd(), "assets/commands/categories")).content;
function getCategory(name) {
    if (!name) return; 
    let modules = categories.filter(function (category) { 
    return category.name.toLowerCase() === name.toLowerCase() || category.id === name;
    });
    if (!modules.length) return;
if (modules.length > 1) return;
return modules[0];
}

   if(imports.getCommand(imports.args[0], imports.client)){
       const command = imports.getCommand(imports.args.shift(), imports.client);
       if(command){
           imports._.each(command, (value, key) => {
               if(key === "run") return;
               if(key == "type")return;
               if(key === "category") return fields.push({name: key, value: (function(){  const ok = getCategory(key)
               if(ok){
                   return ok.name               } else {
                       return;
                   }
                   
               })()
               , inline: true});
               return fields.push({name: key, value: value, inlime: true});
           })
       }
   } else if(getCategory(imports.args[0])){
       const category = getCategory(imports.args.shift())
       if(category){
          let commands = await imports.client.commands.cache.filter((command) => {
              if(command.category && command.category === category.id)return true;
              
              if(!command.category && category.id === "misc") return true;
                        }).map(i => i);
        for(let command of commands){
            fields.push({name: command.name, 
                value: command.desc || command.description,
                inline: true
            
            })
            }    
        }
       
   } else { 

let categoriess = require(require("path").join(process.cwd(), "assets/commands/categories")).content;

for(let category of categoriess){
fields.push({name: category.name, value: `ID: \`${category.id || "<redacted>"}\`\n${category.desc || "Unknown."}`, inline: true});
}
       
   }
   
   
    let number = parseInt(imports.args[0]);
            if (Number.isNaN(number) || !number){
                number = 1;
            }
            let page = imports.getPage(fields, 6, number);
            embed = embed.setFooter(imports.trim(`Page ${page.page}/${page.pages} | ${ embed.footer.text}`,2048))
        for(let field  of fields){
            let index = fields.indexOf(field);
                if(!(index > page.end || index < page.start)){
                    embed = embed.addField((field.name || "unknown").toString(), "||" + (field.value || "redacted").toString() + "||", field.inline);
                    }
            }
       return imports.message.channel.send(embed)
}