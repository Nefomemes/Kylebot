module.eimport.run async (imports) => {
    imports.message.react("<a:DiscordLoading:724125571847815229").then(reaction => {
      async function define() {
        const word = imports.args.join(" ") || "Rick Rolling";
        const query = imports.querystring.stringify({ term: word });
        var { list, error } = await imports.fetch(
          `https://api.urbandictionary.com/v0/define?${query}`
        ).then(response => response.json());
        if (error) {
          return imports.message.channel.send("An error occured! " + error);
        } else {
        const { audit } = require(require("path").join(process.cwd(), "events/utils/filter"));
          list = list.filter(function (definition) {
             
     if(audit(definition.word).length) return false;
     if(audit(definition.definition).length) return false;
     if(audit(definition.example).length) return false;
     return true;
                        })
          if (!list.length)
            return imports.message.channel.send(
              "Unable to get the definition of **" +
              word +
              "**. Maybe you misspell it or nobody have wrote a good definition of that."
            );

          const [answer] = list;

          const embed = new imports.Discord.MessageEmbed()
            .setColor(imports.colors.BG_COLOR)
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
              `Prefix: ${imports.prefix} | ${
              imports.getRandomFunfact()
              }`,
              imports.client.user.displayAvatarURL({ format: "png", dynamic: true })
            );
          return imports.message.channel.send(embed);
        }
      }
      define().catch(error => {
        console.log(error);
        return imports.message.channel.send("An error occured! " + error);

      })
      reaction.remove();
    })
  }
