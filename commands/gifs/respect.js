module.exports = {
  name: "respect",
  run: async (imports) => {

    var a = 0,
      targets = [];
      const getUserFromMention = (mention) => {
  
        if (!mention || !imports.message) return;
    
        if (mention.startsWith("<@") && mention.endsWith(">")) {
          mention = mention.slice(2, -1);
          if (mention.startsWith("!")) {
            mention = mention.slice(1);
          }
        }
        return imports.message.mentions.users.cache.get(mention);
    
      };
   
for(let arg of imports.args){
    let user = getUserFromMention(arg)
    if(user){
      targets.push(user);
    } else {
      break;
    }
}
 


    if (!targets.length) return imports.message.react("❌");
    let gifs = [
      "https://media.discordapp.net/attachments/717210048174096446/719403405625524386/tenor_4.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398381985726524/tenor_3.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398360624267324/tenor_1.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398334120329296/tenor_2.gif"
    ];
    gifs = gifs[Math.floor(Math.random() * gifs.length)];
    var the_reason = imports.args.join(" ");
    if (the_reason) {
      the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
    let embedkill = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription(`${imports.message.author} respected ${targets.join(", ")}${the_reason}`)
      .setImage(gifs)
      .setTimestamp()
      .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`)
    imports.message.channel.send(embedkill);
  }
};
