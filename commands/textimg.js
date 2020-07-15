const e = require("express");

module.exports = {
  name: "textimg",
  description: "Add an up text to the text of your meme.",
  category: "Mematic",
  usage: "nefo!uptext <text> | [url-or-user-mention]",
  example: [
    "nefo!uptext This is Watchtower. | @Nefomemes#3927",
    "nefo!uptext Every `muricans are gangsta | <some-random-picture-url-of-american-chaos>"
  ],
  cooldown: 30,
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
   
    (async function() {
      if (!args.length)
        return message.channel.send("You must write something!");
        const type = args.shift().toLowerCase()
        if(type !== "--up" && type !== "--bottom") return message.channel.send("Invalid mode, please use either `--up` or `--bottom`.");
      var form = args.join(" ").split(" | ");
      
      if (!form[1]) return message.channel.send("You must specify an image!");

      var url = form[1];
      if (getMemberFromMention(url, message)) {
        url = getMemberFromMention(url, message).user.displayAvatarURL({
          format: "png",
          dynamic: true
        });
      } else {
        if(!url.startsWith("https://" || "http://")) return message.channel.send("It seems that is not a link. Please try again.")
        const stream = got.stream(url);

        const imageType = await FileType.fromStream(stream);
        const supportedTypes = ["image/png", "image/jpeg"];
        if (!supportedTypes.includes(imageType.mime))
          return message.channel.send(
            "Invalid type! We currently only supports `image/jpeg` and `image/png` formats."
          );
      }
      message.channel
        .send("<a:DiscordLoading:724125571847815229> Please wait. We are loading it. This will take some time.", {timeout: 1000})
        .then(msg => {
          async function giveText() {
            
         probe(url).then(response => {
          
                msg.edit("<a:DiscordLoading:724125571847815229> Resizing the image.");
            (async function() {
              var scale = 1;
          
              do {
                  scale -= 0.2;
              }while(parseInt(response.width) * scale > 1000 || parseInt(response.height) * scale > 1000)
              do {
                scale += 2;
              } while(parseInt(response.width) * scale < 1000 || parseInt(response.height) * scale < 1000)
              msg.edit("<a:DiscordLoading:724125571847815229> The scale will be " + scale + ". Creating a new canvas. This will take a while.");
             
              const canvas = Canvas.createCanvas(parseInt(response.width) * scale, parseInt(response.height) * scale - 45);
              const ctx = canvas.getContext('2d');
              msg.edit("<a:DiscordLoading:724125571847815229> Converting the text so that it is URL friendly.");
            
              try {

            const idkbruhlol = querystring.stringify({b: form[0].toLowerCase().split("\n").join(" ")});
              // Since the image takes time to load, you should await it
              if(type === "--up"){
              msg.edit("<a:DiscordLoading:724125571847815229> Adding `" + idkbruhlol.slice(2) + "` to the top of the image.");
              let background = await Canvas.loadImage(`https://memegen.link/custom/${idkbruhlol.slice(2)}.jpg?${querystring.stringify({alt: url})}`);
              // This uses the canvas dimensions to stretch the image onto the entire canvas
              ctx.drawImage(background, 0,  0, canvas.width, parseInt(response.height) * scale);
              }else if(type === "--bottom"){
                msg.edit("<a:DiscordLoading:724125571847815229> Adding `" + idkbruhlol.slice(2) + "` to the bottom of the image.");
                const background = await Canvas.loadImage(`https://memegen.link/custom/%20/${idkbruhlol.slice(2)}.jpg?${querystring.stringify({alt: url})}`);
                // This uses the canvas dimensions to stretch the image onto the entire canvas
                ctx.drawImage(background, 0,  0, canvas.width, parseInt(response.height) * scale);
              } else {
                return msg.edit("Somehow we didn't know what type you want. Terminating process.");
              }}
            catch(error){
              return msg.edit("Ugh, we have a critical problem. " + error + ". Terminating process.");
              console.error(error);
            }
            try {
        
            } catch(error){
              console.error(error);
                msg.edit("<a:DiscordLoading:724125571847815229> Somehow unable to eliminate the watermark. It's not priority though.");
            } finally {
              // Use helpful Attachment class structure to process the file for you
              msg.edit("<a:DiscordLoading:724125571847815229> Everything done. Sending the image.")
              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.id}.png`);
            message.channel.send(attachment).then(msgSent => {
              msg.edit("<a:DiscordLoading:724125571847815229> Everything done. Creating an embed.");
              const embed = new Discord.MessageEmbed()
              .setColor("#7289da")
              .setAuthor("Powered by memegen.link", "https://memegen.link/static/images/logo.png", "https://memegen.link/")
              .setDescription("Doesn't look like what you expect? Join [our support server]() and report a bug there. And yes, we cropped the image to delete the watermark.")
              .setThumbnail("https://memegen.link/static/images/logo.png")
              .setTimestamp()
              .setFooter("Prefix: nefo! | " + funfact[Math.floor(Math.random() * funfact.length)], "")
              msg.edit("<a:DiscordLoading:724125571847815229> Sending embed.");
              message.channel.send(embed).then(msgIdksent => {
                msg.delete();
              })

            }).catch(error => {
              message.channel.send("An error occured! " + error);
              console.error(error);
            });
  
          }
                        })();
            });
          

        
          }

          giveText(url, form[0]);
        });
    })();
  }
};
