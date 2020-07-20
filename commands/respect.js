module.exports = {
  name: "respect",
  run: async (imports)=>{
    if(!imports.args.length)
      return imports.message.reply("you must write something!");
    if (
      imports.args[0].startsWith("<@") == false ||
      imports.args[0].endsWith(">") == false ||
      !imports.message.mentions.users
    )
      return imports.message.reply("You must mention someone!");
    argss = imports.args.join(" ").split(" | ");

    var a = 0;
    targets = [];
    do {
      targets[a] = imports.built_ins.getMemberFromMention(imports.args.shift(), imports.message)
      a++;
    } while (imports.built_ins.getMemberFromMention(imports.args[0], imports.message));
  

  if(!targets.length)return imports.message.channel.send("Noone to be respected?");
    let gifs = [
      "https://media.discordapp.net/attachments/717210048174096446/719403405625524386/tenor_4.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398381985726524/tenor_3.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398360624267324/tenor_1.gif",
      "https://media.discordapp.net/attachments/717210048174096446/719398334120329296/tenor_2.gif"
    ];
    gifs = gifs[Math.floor(Math.random() * gifs.length)];
    var the_reason = imports.args.join(" ");
    if(the_reason){
    the_reason = ` because "` + imports.args.join(" ") + `".`;
    } else {
      the_reason = "."
    }
    let embedkill = new imports.Discord.MessageEmbed()
      .setColor(imports.colors.BG_COLOR)
      .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
      .setDescription(`${imports.message.author} respected ${targets.join(", ")}${the_reason}`)
      .setImage(selectedGIF)
      .setTimestamp()
      .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`)
      imports.message.channel.send(embedkill);
  }
};
