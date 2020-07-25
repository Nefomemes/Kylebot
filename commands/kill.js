module.exports = {
  name: "kill",
run: async (imports) =>{
    var gifs;
    var a = 0;
    var targets = [];
    var deleteArgs;
   do {
      targets[a] = imports.getMemberFromMention(imports.args.shift(), imports.message)
      a++;
    } while (imports.getMemberFromMention(imports.args[0], imports.message));
if(!targets.length || targets.length < 1) return imports.message.react("❎");
    var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
    if (targets.length === 1) {
      gifs = [
        "https://i.imgur.com/wRTNTzP.gif",
        "https://i.imgur.com/cGsTWLw.gif",
        "https://i.imgur.com/qItOV7f.gif",
        "https://i.imgur.com/jhkqhed.gif",
        "https://i.imgur.com/GcpLcbq.gif",
        "https://i.imgur.com/XVEndwF.gif",
        "https://i.imgur.com/DwqjmeF.gif",
        "https://i.imgur.com/MGTVlf3.gif",
        "https://i.imgur.com/odeVVwc.gif"
      ];
    } else if (targets.length === 2) {
      gifs = ["https://i.imgur.com/zDPfrrF.gif"];
    } else {
      gifs = ["https://i.imgur.com/OLeruXR.gif"];
    }

gifs = gifs[Math.floor(Math.random() * gifs.length)];
   let embedkill = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
      .setDescription(imports.trim(`${imports.message.author} killed ${targets.join(", ")}${the_reason}`, 2048))
      .setImage(gifs)
      .setTimestamp()
      .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`)
      imports.message.channel.send(embedkill);

  }
};
