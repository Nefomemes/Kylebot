module.exports = {
  name: "betray",

  execute(
    message,
    args,
    client,
    fs,
    Canvas,
    getRandomFunfact,
    figlet,
    translate,
    Discord,
    fetch,
    querystring,
    xml2js,
    killtreaks_utils,
    got,
    FileType,
    sizeOf,
    trim,
    getMemberFromMention,
    probe,
    http,
    imagesize,
    timestamps,
    customSplit
  ) {
    var gifs;
    var a = 0;
    targets = [];
    do {
      targets[a] = "<@" + getMemberfromMention(args.shift()) + ">";
      a++;
    } while (getMemberfromMention(args[0]));

    if (a === 1) {
      gifs = [
        "https://media.discordapp.net/attachments/665442594335096832/714676860067250518/codmw2cr_shepherd-betrayal_1person.gif"
      ];
    } else {
      gifs = [
        "https://media.discordapp.net/attachments/665442594335096832/714676888819466250/codmw2cr_shepherd-betrayal_2personormore.gif "
      ];
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#7289da")
      .setAuthor(
        "Nefomemes#3927",
        "https://images-ext-1.discordapp.net/external/7Z_bbAFsk8OXHR_x6M8AV52RnfLG7FdeftYJSntRyVM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/665424841263808532/c128f3e53158dcc9640b7f8e096da992.png",
        "https://nefomemes.blogspot.com/"
      )
      .setDescription(
        `${message.author}` +
          " betrayed " +
          targets.join(", ") +
          ' because "' +
          args.join(" ") +
          '".'
      )
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp()
      .setFooter(
        "Prefix: nefo! | " + getRandomFunfact()
      );

    message.channel.send(embed);
  }
}; /* */

/*'https://media.discordapp.net/attachments/665442594335096832/714676860067250518/codmw2cr_shepherd-betrayal_1person.gif' */
