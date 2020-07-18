module.exports = {
  name: "kill",



  execute(imports) {
    var gifs;
    var a = 0;
    var targets = [];
    var deleteArgs;
    do {
      targets[a] = imports.built_ins.getMemberFromMention(imports.args[0], imports.message);
      deleteArgs = imports.args.shift();
      a++;
    } while (imports.built_ins.getMemberFromMention(imports.args[0],imports.message));
    if(!targets.length) return imports.message.channel.send("Uggh, who you want to kill?").then(() => {
      timestamps.delete(imports.message.author.id);
    })
    if(targets.includes(imports.message.member)) {
      let no_suicide = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setTitle("You can't kill yourself!")
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
      .setDescription("It's not good!")
      .setImage("https://i.imgflip.com/4/26wvib.jpg")
      .setTimestamp()
      .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`, "https://cdn.discordapp.com/icons/665424841263808532/c128f3e53158dcc9640b7f8e096da992.png")
      return message.channel.send(no_suicide);
    }
    var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
    if (a === 1) {
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
    } else if (a === 2) {
      gifs = ["https://i.imgur.com/zDPfrrF.gif"];
    } else {
      gifs = ["https://i.imgur.com/OLeruXR.gif"];
    }

    const embed = new imports.Discord.MessageEmbed()
      .setColor(process.env.BG_COLOR)
    .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", }))
      .setDescription(
        `${imports.message.author}` +
          " killed " +
          targets.join(", ") +the_reason)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp()
      .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`);

    imports.message.channel.send(embed);
  }
};
