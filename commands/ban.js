module.exports = {
  name: "ban",
  category: "Moderation",
  description: "Ban a member.",
  usage: "nefo!ban <member> reason",
  example: "nefo!ban @Joe Mama#7686",
  permsreq: ["BAN_MEMBERS"],
  guildcmd: true,
  execute(imports) {
 if(!args.length){
  imports.args = ["ban"];
   
  return imports.client.commands.get("help").execute(imports).catch(err => {
    imports.message.channel.send("An error occured! " + err);
  });
 }
   
    
  
        var member = imports.message.guild.members.cache.get(imports.args[0]) ||
          imports.getMemberFromMention(imports.args[0], message);
        const target = args.shift();
        if (
          imports.message.member.roles.highest.position < member.roles.highest.position
        )
          return imports.message.reply(
            "You can't ban this user! They have the high ground!"
          );
        if (
          imports.message.member.roles.highest.position ===
          imports.member.roles.highest.position
        )
          return message.reply(
            "You can't kick this user! You have the same highest role as them!"
          );
        if (!member.bannable)
          return imports.message.reply(
            "I can't kick this user! It seems they are above the bot. Try moving the bot's role to the top."
          );
        const filter = m => m.author.id === imports.message.author.id;
        var succeed = 0;
        const collector = message.channel.createMessageCollector(filter, {
          time: 120000
        });
        message.channel.send(
          "Are you sure you want to ban " +
            member.user.username +
            "#" +
            member.user.discriminator +
            "? Reply with yes to continue or anything else to cancel in the next 120 seconds."
        );

        collector.once("collect", msg => {
          if (msg.content.toLowerCase().startsWith("yes")) {
            const embed = new Discord.MessageEmbed()
              .setColor("#7289da")
              .setTitle(`Banned from ${message.guild.name}`)
              .setAuthor(
                `${message.author.username}#${message.author.discriminator}`
              )
              .setDescription(
                `You just got banned from ${message.guild.name} (ID: ${
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
            member.ban(
              trim(
                `Banned by: ${message.author.username}#${
                  message.author.discriminator
                } ID: ${message.author.id} Reason: ${args.join(" ")}`,
                512
              )
            );
            message.channel.send(
              `${message.author} has banned ${member.user.username}#${
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
