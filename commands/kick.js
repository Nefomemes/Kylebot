module.exports = {
  name: "kick",

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

    if (
      !args ||
      args == "" ||
      args == undefined ||
      args == "undefined" ||
      args == null ||
      args == "null"
    )
      return message.reply("you must write something!");
    if (
      args[0].startsWith("<@") == false ||
      args[0].endsWith(">") == false ||
      !message.mentions.users
    )
      return message.reply("You must mention someone!");

    var member =
      message.guild.members.cache.get(args[0]) ||
      getMemberFromMention(args[0]);
    const target = args.shift();
    if (
      message.member.roles.highest.position < member.roles.highest.position
    )
      return message.reply(
        "You can't kick this user! They have the high ground!"
      );
    if (
      message.member.roles.highest.position ===
      member.roles.highest.position
    )
      return message.reply(
        "You can't kick this user! You have the same highest role as them!"
      );
    if (!member.kickable)
      return message.reply(
        "I can't kick this user! It seems they are above the bot. Try moving the bot's role to the top."
      );
    const filter = m => m.author.id === message.author.id;
    var succeed = false;
    const collector = message.channel.createMessageCollector(filter, {
      time: 120000
    });
    message.channel.send(
      "Are you sure you want to kick " +
      member.user.username +
      "#" +
      member.user.discriminator +
      "? Reply with yes to continue or anything else to cancel in the next 120 seconds."
    );

    collector.once("collect", msg => {
      if (msg.content.toLowerCase().startsWith("yes")) {
        const embed = new Discord.MessageEmbed()
          .setColor("#7289da")
          .setTitle(`Kicked from ${message.guild.name}`)
          .setAuthor(
            `${message.author.username}#${message.author.discriminator}`
          )
          .setDescription(
            `You just got kicked from ${message.guild.name} (ID: ${
            message.guild.id
            } by ${message.author.username}#${
            message.author.discriminator
            } (ID: ${message.author.id} because ${args.join(" ")} at ${
            message.createdTimestamp
            }.))`
          )
          .setThumbnail(
            message.guild.iconURL({ format: "png", dynamic: "true" })
          )
          .setTimestamp()
          .setFooter(
            "Prefix: nefo! | If you still wants to use Nefobot, feel free to join the support server, discord.gg/uBE8Sbh , however, don't break the rules, okay?"
          );
        member.kick(
          trim(
            `Kicked by: ${message.author.username}#${
            message.author.discriminator
            } ID: ${message.author.id} Reason: ${args.join(" ")}`,
            512
          )
        );
        message.channel.send(
          `${message.author} has kicked ${member.user.username}#${
          member.user.discriminator
          } (ID: ${member.user.id}) from ${
          message.guild.name
          } because ${args.join(" ")}`
        );
        succeed = true;
        collector.stop();
      } else {
        collector.stop();
      }
    });
    collector.on("end", collected => {
      if ((succeed = true)) {
      } else {
        message.channel.send("Command canceled.");
      }
    });

  }
};
