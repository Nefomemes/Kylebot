module.exports.run = async (imports) => {
    async function loadSteam() {

      var query = imports.querystring.stringify({ b: imports.args.join(" ") }).slice(2);
      let { profile, avatars, id } = await imports.fetch(
        `https://api.alexflipnote.dev/steam/user/${query}`
      ).then(response => response.json());
      const embed = new imports.Discord.MessageEmbed()
        .setColor(imports.colors.BG_COLOR)
        .setTitle(profile.username)
        .setURL(profile.url)
        .setAuthor(
          "Powered by Steam (API provided by AlexFlipnote though)",
          "https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png",
          "https://api.alexflipnote.dev/"
        )
        .setDescription(profile.summary)
        .setThumbnail(avatars.avatarfull)
        .addFields(
          { name: "Steam ID 3", value: id.steamid3, inline: true },
          { name: "Steam ID 32", value: id.steamid32, inline: true },
          { name: "Steam ID 64", value: id.steamid64, inline: true },
          { name: "State", value: profile.state },
          { name: "Privacy", value: profile.privacy },
          { name: "Time created", value: profile.timecreated },
          { name: "Vaccum banned", value: profile.vacbanned }
        )
        .setImage(profile.background)
        .setTimestamp()
        .setFooter(
          `Prefix: ${imports.prefix} | ${
          imports.getRandomFunfact()
          }`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true })
        );

      return imports.message.channel.send(embed);
    }
    loadSteam().catch(error => {
      imports.message.channel.send("An error occured! " + error);
    })
  }
