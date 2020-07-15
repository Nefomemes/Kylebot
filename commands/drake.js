module.exports = {
  name: "drake",

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
    if (true) return message.channel.send("This command is not available!");
    message.channel.send(
      "Let's get started, what do you want the second panel be? Please send it in 120 seconds."
    );
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      time: 120000
    });
    var drake;
    var watermark;
    var nefoMark = false;
    var fourthPanel;
    var secondPanel;

    async function drakePost(
      message,
      args,
      client,
      fs,
      si,
      Canvas,
      funfact,
      figlet,
      translate,
      Discord,
      fetch,
      querystring,
      xml2js,
      google_token,
      tenor_token,
      killtreaks_utils,
      got,
      FileType,
      sizeOf,
      trim,
      getMemberFromMention
    ) {
      if (true) return;
      const canvas = Canvas.createCanvas(300, 292);

      const ctx = canvas.getContext("2d");

      const template = await Canvas.loadImage(
        "https://en.meming.world/images/en/0/07/Drakeposting.jpg"
      );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    collector.once("collect", m => {
      secondPanel = m.content;
      message.channel.send(
        "Okay, then. What do you want the fourth panel be? Please send it in 120 seconds."
      );
      collector.once("collect", msg => {
        fourthPanel = msg.content;
        message.channel.send(
          "Okay then. Do you want to rename the Drake? Reply with `yes` or `no`, not case sensitive, in 120 seconds. Actually, writing anything else will result in the `no`."
        );
        collector.once("collect", ms => {
          const drakeType = ms.content.toLowerCase("");
          if (drakeType === "yes") {
            message.channel.send(
              "Okay, then. What do you want to name the Drake? Send it in 120 seconds."
            );
            collector.once("collect", mss => {
              drake = mss.content;
            });
          }
          message.channel.send(
            "Do you want to add a watermark?  Reply with `yes` or `no`, not case sensitive, in 120 seconds. Actually, writing anything else will result in the `no`."
          );
          collector.once("collect", mgg => {
            const mggl = mgg.content.toLowerCase();

            if (mggl == "yes") {
              message.channel.send("What do you want your watermark be?");
              collector.once("collect", msgg => {
                watermark = msgg.content;
                message.channel.send(
                  "Do you want to support us by adding our own watermark? Better not though if you are planning to submit the meme to Reddit or other meme submissions."
                );
                collector.once("collect", mssgg => {
                  const mssggl = mssgg.content.toLowerCase();
                  if (mssggl === "yes") {
                    nefoMark = true;
                  }
                  message.channel.send(
                    `Second panel: ${secondPanel}\nFourth panel: ${fourthPanel}\nDrake: ${drake}\nWatermark: ${watermark}\nNefobot watermark: ${nefoMark}`
                  );
                });
              });
            } else {
              message.channel.send(
                "Do you want to support us by adding our own watermark? Better not though if you are planning to submit the meme to Reddit or other meme submissions."
              );
              collector.once("collect", mssgg => {
                const mssggl = mssgg.content.toLowerCase;
                if (mssggl === "yes") {
                  nefoMark = true;
                }
                message.channel.send(
                  `Second panel: ${secondPanel}\nFourth panel: ${fourthPanel}\nDrake: ${drake}\nWatermark: ${watermark}\nNefobot watermark: ${nefoMark}`
                );
              });
            }
          });
        });
      });
    });

    collector.on("end", collected => {
      console.log(`Command ended.`);
    });
  }
};
