module.exports = {
  name: "resize",
  run: async (imports) => {
    (async function () {
      if (args.length < 3)
        return message.channel.send(
          "Invalid usage. Please specify the width, height, an a URL / user mention."
        );
      const width = parseInt(args.shift());
      const height = parseInt(args.shift());
      const url = args.shift();

      const name = `${message.id}`;

      if (!width || !height)
        return message.channel.send("Invalid size. Please try again.");
      function getMemberFromMention(mention) {
        if (!mention) return;

        if (mention.startsWith("<@") && mention.endsWith(">")) {
          mention = mention.slice(2, -1);

          if (mention.startsWith("!")) {
            mention = mention.slice(1);
          }

          return message.guild.members.cache.get(mention);
        }
      }

      const canvas = Canvas.createCanvas(width, height);
      const ctx = canvas.getContext("2d");
      var image;

      if (getMemberFromMention(url)) {
        image = getMemberFromMention(url).user.displayAvatarURL({
          format: "png",
          dynamic: "false"
        });
      } else {
        const stream = got.stream(url);

        const imageType = await FileType.fromStream(stream);
        const supportedTypes = ["image/png", "image/jpeg"];
        if (supportedTypes.includes(imageType.mime)) {
          image = url;
        } else {
          return message.channel.send(
            "Invalid type! We currently only supports `image/jpeg` and `image/png` formats."
          );
        }
      }

      const picture = await Canvas.loadImage(image);
      ctx.drawImage(picture, 0, 0, canvas.width, canvas.height);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        `${name}.png`
      );
      message.channel.send(attachment);
    })();
  }
};
