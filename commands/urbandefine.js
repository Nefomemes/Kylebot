module.exports = {
  name: "urbandefine",

  run: async(imports)=> {
    imports.message.channel.send("<a:DiscordLoading:724125571847815229> Please wait, we are loading it.").then(msg => {
    async function define() {
      const word = imports.args.join(" ") || "Rick Rolling";
      const query = imports.querystring.stringify({ term: word});
      var { list, error } = await imports.fetch(
        `https://api.urbandictionary.com/v0/define?${query}`
      ).then(response => response.json());
      if (error) {
        return imports.message.channel.send("An error occured! "+ error);
      } else {
        let badwords = require("../assets/configs/badwords.json").contents;
     
        list = list.filter(function(definition){
          
          let description = definition.definition.split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
          let example = definition.example.split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
          description = description.filter(function(word){
            return badwords.includes(word.toLowerCase());
          });
          example = example.filter(function(word){
            return badwords.includes(word.toLowerCase());
          })

          return !badwords.includes(definition.word.toLowerCase()) && !description.length && !example.length;
        })
        if (!list.length)
          return imports.message.channel.send(
            "Unable to get the definition of **" +
              word +
              "**. Maybe you misspell it or nobody have wrote a good definition of that."
          );

        const [answer] = list;

        const embed = new imports.Discord.MessageEmbed()
          .setColor(imports.colors.BG_COLORS)
          .setTitle(answer.word)
          .setURL(answer.permalink)
          .setAuthor(
            "Powered by Urban Dictionary",
            "https://storage.googleapis.com/burbcommunity-morethanthecurve/2013/09/urban-dictionary-logo.gif",
            "https://www.urbandictionary.com/"
          )
          .setDescription(imports.trim(answer.definition, 2048))
          .setThumbnail(
            "https://storage.googleapis.com/burbcommunity-morethanthecurve/2013/09/urban-dictionary-logo.gif"
          )
          .addFields(
            { name: "Example", value: imports.trim(answer.example, 1024) },
            {
              name: "Rating",
              value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`
            }
          )
          .setTimestamp()
          .setFooter(
            `Prefix: ${process.env.PREFIX} | ${
              imports.built_ins.getRandomFunfact()
            }`,
           imports.client.user.displayAvatarURL({format: "png", dynamic: true})
          );
        return imports.message.channel.send(embed);
      }
    }
    define().catch(error => {
      return imports.message.channel.send("An error occured! " + error);
    })
    msg.delete();
  })
  }
};
