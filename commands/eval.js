module.exports = {
  name: "eval",


    execute(imports) {

        if(imports.message.author.id != "665419057075585025") return imports.message.channel.send("You can't use this. Only Nefomemes can.");
        if(!imports.args) return imports.message.reply("You must write something!");
        
        
        var embed = new imports.Discord.MessageEmbed()
        .setColor(require("../assets/configs/color.json").content.BG_COLOR)
        .setTitle("Kyle - Debug Page")
        .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format:"png", dynamic: true}), process.env.WEBSITE)
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format:"png", dynamic: true}));
        
        async function evaluate(code){
            return await eval(code)
        }
        imports.message.channel.send("Please wait, we are loading it.").then(msg => {


        evaluate(imports.args.join(" ")).then(result => {
            let content = require("util").inspect(result, {depth: 0});
            var options = ["Input ```" + imports.args.join(" ") + "```\n Output: ```" + content + "``` \n\n" + `Discord API: ${imports.client.ws.ping} ms. Bot latency: ${msg.createdTimestamp - imports.message.createdTimestamp}ms.`, "Input ```" + imports.args.join(" ") + "```\n Output: ```Attached ``` \n\n" + `Discord API: ${imports.client.ws.ping} ms. Bot latency: ${msg.createdTimestamp - imports.message.createdTimestamp}ms.`]
            if(options[0].length < 2048){
                embed.setDescription(options[0]);
            } else {
                embed.setDescription(options[1]);
                imports.message.channel.send("```" +trim( content , 1094) + "```");
            }
            imports.message.channel.send(embed).then(msgSent => {
                msg.delete();
            })
        }).catch(error => {
        
            embed.setDescription("Input ```" + imports.args.join(" ") + "```\n Output: ```" + error + "``` \n\n" + `Discord API: ${imports.client.ws.ping} ms. Bot latency: ${msg.createdTimestamp - imports.message.createdTimestamp}ms.`)
            embed.setImage("https://images-ext-2.discordapp.net/external/C8q_KVwysaCFIYI09U5IUxdx7KqpX0yXH_4rdpP2D6k/https/i.kym-cdn.com/entries/icons/facebook/000/031/260/Screen_Shot_2019-09-24_at_4.22.16_PM.jpg?width=846&height=475")
            imports.message.channel.send(embed).then(msgSent => {
                msg.delete();
            })
          
        })
  
    })
    }
}