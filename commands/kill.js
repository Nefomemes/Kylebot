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
