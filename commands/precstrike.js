module.exports = {
  name: "precstrike",

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
    var webhook_too_many = false;
    message.guild.fetchWebhooks().then(webhooks => {
      if (webhooks.size >= 8) {
        webhook_too_many = true;
      }
    });

    if (webhook_too_many === true)
      return message.channel.send(
        "It seems there was too many webhooks in the server. Please reduce it. Maximal is ten."
      );

    const side =
      killstreaks_utils.teams[
        Math.floor(Math.random() * killstreaks_utils.teams.length)
      ];
    const channel = message.channel;
    const idkQuotes = [
      "Grid marked! Send it.",
      "Let's blow it up. Grid marked!"
    ];
    channel
      .createWebhook(message.member.displayName, {
        avatar: message.author.displayAvatarURL({
          format: "png",
          dynamic: "true"
        })
      })
      .then(operatorWebhook => {
        message.delete();
        operatorWebhook.send(
          idkQuotes[Math.floor(Math.random() * idkQuotes.length)]
        );
        channel
          .createWebhook(side.main_killstreak_op + " Airstrike Operator", {
            avatar: side.url
          })
          .then(killstreakWebhook => {
   
       
            killstreakWebhook
              .send("This is Striker 3-1, good copy. Strike inbound.", {
                timeout: 1500
              })
              .then(msg => {
                const embed = new Discord.MessageEmbed()
                  .setColor("#7289da")
                  .setTitle("Precision Airstrike")
                  .setAuthor(
                    "Nefomemes#3927",
                    "https://images-ext-1.discordapp.net/external/7Z_bbAFsk8OXHR_x6M8AV52RnfLG7FdeftYJSntRyVM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/665424841263808532/c128f3e53158dcc9640b7f8e096da992.png",
                    "https://discord.gg/uBE8Sbh"
                  )
                  .setImage("https://i.imgur.com/XE5RdcA.gif")
                  .setTimestamp()
                  .setFooter(
                    `Prefix: nefo! | ${getRandomFunfact()}`,
                    "https://images-ext-1.discordapp.net/external/cxA-emda_xKpbBgSbwGG2hNCiEtW_v3bGjVmhNgix08/https/images-ext-1.discordapp.net/external/7Z_bbAFsk8OXHR_x6M8AV52RnfLG7FdeftYJSntRyVM/%253Fsize%253D1024/https/cdn.discordapp.com/icons/665424841263808532/c128f3e53158dcc9640b7f8e096da992.png?width=475&height=475"
                  );
                setTimeout(function() {
                  message.channel.send(embed).then(msg => {
                    killstreakWebhook
                      .send(
                        killstreaks_utils.results[
                          Math.floor(
                            Math.random() * killstreaks_utils.results.length
                          )
                        ],
                        { timeout: 1500 }
                      )
                      .then(messageSent => {
                        operatorWebhook.delete();
                        killstreakWebhook.delete();
                      });
                  });
                }, 1500);
              });
          });
      });
  }
};
