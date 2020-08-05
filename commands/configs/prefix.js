module.exports = {
  name: "prefix",
  category: "Bot",

  description: "Scrapped command.",
  usage: "nefo!prefix",
  explanation: "None",
  example: "nefo!prefix",
  //  description: "Change the guild prefix. However the `nefo!` prefix will still works.",
  //    usage: "nefo!prefix <prefix>",
  // explanation: "Don't make the prefix too long or unwritable by normal keyboard. By the way, using no arguments will delete the current guild prefix.",
  //  example: "nefo!prefix nf!",

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
    return message.channel.send("Of course, the prefix is `nefo!`.");

    (async function() {
      if (args[0].toLowerCase() === "--clear") {
        if (
          message.member.hasPermission("ADMINISTRATOR") ||
          message.author.id === message.guild.ownerID
        ) {
          await prefixes.delete(message.guild.id);
          return message.channel.send(
            "Done! The guild prefix have been cleared! Now members must use the original `nefo!` prefix."
          );
        } else {
          return message.channel.send(
            "You need the Administrator permission before clearing the guild prefix."
          );
        }
      } else if (args[0]) {
        if (
          message.member.hasPermission("ADMINISTRATOR") ||
          message.author.id === message.guild.ownerID
        ) {
          await prefixes.set(message.guild.id, args[0]);
          return message.channel.send(
            `Successfully changed the guild prefix to \`${args[0]}\``
          );
        } else {
          return message.channel.send(
            "You need the Administrator permission before changing the guild prefix."
          );
        }
      } else {
        return message.channel.send(
          `The guild prefix is \`${(await prefixes.get(message.guild.id)) ||
            globalPrefix}\`. But you can always use the \`nefo!\` prefix everywhere.`
        );
      }
    })();
  }
};
