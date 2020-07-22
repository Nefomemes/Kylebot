module.exports = {
  name: "kill",
run: async (imports) =>{
    var gifs;
    var a = 0;
    var targets = [];
    var deleteArgs;
   do {
      targets[a] = imports.built_ins.getMemberFromMention(imports.args.shift(), imports.message)
      a++;
    } while (imports.built_ins.getMemberFromMention(imports.args[0], imports.message));
    if(!targets.length) return imports.message.channel.send("Uggh, who you want to kill?").then(() => {
      timestamps.delete(imports.message.author.id);
    })

    var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
    if (targets.length === 1) {
      gifs = [
        "https://media.discordapp.net/attachments/712631135099813940/715868841225224223/ghost-execution-1.gif",
        "https://media.discordapp.net/attachments/712631135099813940/715869863440285697/ghost-execution-2.gif",
        "https://media.discordapp.net/attachments/712631135099813940/715870147264381008/ghost-execution-3.gif",
        "https://media.discordapp.net/attachments/712195322671267873/716120348365553674/ghost-execution-4-fixed.gif",
        "https://media.discordapp.net/attachments/712631135099813940/715872115659636746/ghost-execution-5.gif",
        "https://i.imgur.com/XVEndwF.gif",
        "https://i.imgur.com/DwqjmeF.gif",
        "https://i.imgur.com/MGTVlf3.gif"
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
      .setDescription(`${imports.message.author} killed ${targets.join(", ")}${the_reason}`)
      .setImage(gifs)
      .setTimestamp()
      .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`)
      imports.message.channel.send(embedkill);

  }
};
