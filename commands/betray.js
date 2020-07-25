module.exports = {
  name: "betray",

  run: async (imports) => {
    var gifs;
    var a = 0;
    targets = [];
    do {
      targets[a] = + imports.getMemberFromMention(imports.args.shift());
      a++;
    } while (imports.getMemberFromMention(imports.args[0], imports.message));
if(!targets.length || targets.length < 1)return imports.message.react("❎");
    if (a === 1) {
      gifs = [
        "https://media.discordapp.net/attachments/665442594335096832/714676860067250518/codmw2cr_shepherd-betrayal_1person.gif"
      ];
    } else {
      gifs = [
        "https://media.discordapp.net/attachments/665442594335096832/714676888819466250/codmw2cr_shepherd-betrayal_2personormore.gif "
      ];
    }

    var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
   
    const embed = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}), process.env.WEBSITE)
      .setDescription(imports.trim(`${imports.message.author}` +" betrayed " +targets.join(", ") +the_reason, 2048))
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp()
      .setFooter(
        `Prefix: ${imports.prefix} | ` + imports.getRandomFunfact(), imports.client.user.displayAvatarURL({format:"png", dynamic: true})
      );

    imports.message.channel.send(embed);
  }
}; 