module.exports = {
  name: "ascii",
  execute(imports) {
    
    if (imports.args.join(" ").length > 14 || !imports.args.length) {
      imports.args = ["ascii"];
      return imports.client.commands.get("help").execute(imports);
    };
    imports.figlet(imports.args.join(" "), function(err, data) {
      if (err) return message.channel.send("An error occured! " + err);
      const embed = new imports.Discord.MessageEmbed()
      .setColor(process.env.BG_COLOR)
      .setDescription(`\`\`\`${data}\`\`\``)
      .setTimestamp()
      .setFooter(
        `Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`
      );
    return imports.message.channel.send(embed);
  });

  }
};
