module.exports = {
  name: "randomufo",

  execute(imports) {
    (async function() {
 
      const { sightings } = await imports.fetch(
        "https://ufo-api.herokuapp.com/api/sightings/search?"
      ).then(response => response.json());


      const randomSighting =
        sightings[Math.floor(Math.random() * sightings.length)];

      var timeInt = randomSighting.date.split("T");
      const clock = timeInt[1].slice(0, 5);
      var dateInt = timeInt[0].split("-");
      const date = `${dateInt[2]} ${dateInt[1]} ${dateInt[0]} `;
      const time = date + clock;

      const embed = new imports.Discord.MessageEmbed()
        .setColor(process.env.BG_COLOR)
        .setTitle("UFO Sighting")
        .setURL(randomSighting.url)
        .setAuthor(
          "Powered by the National UFO Reporting Center (API provided by UFO API though)",
          "https://www.nuforc.org/nuforc.gif",
          "https://ufo-api.herokuapp.com/"
        )
        .setDescription(imports.trim(randomSighting.summary, 2048))
        .setThumbnail("http://www.nuforc.org/nuforc.gif")
        .addFields(
          { name: "ID", value: randomSighting._id , inline: true},
          {
            name: "Location",
            value: `${randomSighting.city}, ${randomSighting.state}`,inline: true
          },
          { name: "Date", value: time },
          { name: "Checkmate!", value: "`Muricans." , inline: true},
          { name: "Duration", value: randomSighting.duration, inline: true },
          { name: "Shape", value: randomSighting.shape, inline: true },
          { name: "Exact location", value: randomSighting.loc , inline: true},
          { name: "Added", value: randomSighting.dateAdded , inline: true}
        )
        .setTimestamp()
        .setFooter(
          `Prefix: ${prefix.env.PREFIX} | These are just sightings. These DOES NOT CONFIRM THE EXISTENCE OF UFOS. `,
          imports.client.user.displayAvatarURL({format: "png", dynamic: true})
        );
      imports.message.channel.send(embed);
    })();
  }
};
