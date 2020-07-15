module.exports = {

  execute(imports) {
    if(!imports.args.length){
      imports.args = ["wttr"];
      return imports.client.commands.get("help").execute(imports).catch(error => {
        imports.message.channel.send(`An error occured! ${error}`);
      });
    }
    var deleteSpaces = imports.querystring.stringify({ a: args.join(" ") }).slice(2);
    const embed = new imports.Discord.MessageEmbed()
      .setColor(process.env.BG_COLOR)
      .setTitle("Weather Forecast for " + args.join(" "))
      .setURL(`https://wttr.in/${deleteSpaces}`)
      .setAuthor(
        "Powered by wttr.in",
        "https://images-ext-2.discordapp.net/external/HiySDkddPO6vZ2MUYxv_SwOiF_eHA1mGwbpmKGkJBJk/https/cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png?width=475&height=475",
        "https://wttr.in/"
      )
      .setThumbnail(
        "https://images-ext-2.discordapp.net/external/HiySDkddPO6vZ2MUYxv_SwOiF_eHA1mGwbpmKGkJBJk/https/cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png?width=475&height=475"
      )
      .setImage(`https://wttr.in/${deleteSpaces}.png`)
      .setTimestamp()
      .setFooter(
        `Prefix: ${process.env.PREFIX} | ${
      imports.getRandomFunfact()
        }`,
        imports.client.user.displayAvatarURL({format: "png", dynamic: true})
      );

    imports.message.channel.send(embed);
  }
};
