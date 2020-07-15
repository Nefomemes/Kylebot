const { parseString } = require("xml2js");

module.exports = {
  name: "encode",

  execute(imports) {
    async function encode(){
  const query = imports.args.join(" ") || "Never Gonna Give You Up";
    
  const encode = await imports.fetch(`https://useless-api.vierofernando.repl.co/encode?${imports.querystring.stringify({text: query})}`).then(response => response.json());
  if(encode.oops) return imports.message.channel.send(`A ${encode.oops} error occured! ${encode.why}`);
  
  var embed = new imports.Discord.MessageEmbed()
  .setColor(process.env.BG_COLOR)
  .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}), process.env.WEBSITE)
  .addFields({name: "Base 64", value: `\`\`\`${encode["base64"]}\`\`\``, inline: true},
              {name:"Braille", value: `\`\`\`${encode["braille"]}\`\`\``, inline: true},
              {name: "Binary", value: `\`\`\`${encode["binary"]}\`\`\``, inline: true},
              {name: "a1z26", value: `\`\`\`${encode.ciphers.a1z26}\`\`\``, inline: true},
              {name: "Atbash", value: `\`\`\`${encode.ciphers.atbash}\`\`\``, inline: true},
              {name: "Morse", value: `\`\`\`${encode.ciphers.morse}\`\`\``, inline: true},
              {name: "ROT13", value: `\`\`\`${encode.ciphers.rot13}\`\`\``, inline: true},
              {name: "Encoded URL", value: `\`\`\`${encode["encoded url"]}\`\`\``, inline: true},
              {name: "Random Case", value: `\`\`\`${encode["randomcase"]}\`\`\``, inline: true}, 
              {name: "Reversed", value: `\`\`\`${encode["reversed"]}\`\`\``, inline: true},
              {name: "Cursive", value: `\`\`\`${encode.styles.cursive}\`\`\``, inline: true},
              {name: "Fancy", value: `\`\`\`${encode.styles.fancy}\`\`\``, inline: true},
              {name: "Upside down", value: `\`\`\`${encode.styles["upside-down"]}\`\`\``, inline: true},
              {name: "Querify", value: `\`\`\`${imports.querystring.stringify({a: query}).slice(2)}\`\`\``, inline: true})
  .setTimestamp()
  .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`)
      const viero = imports.client.users.cache.get("661200758510977084");
      if(viero){
        embed = embed.setAuthor(`Powered by ${viero.username}#${viero.discriminator}`, viero.displayAvatarURL({format: "png", dynamic: true}))
      }
return imports.message.channel.send(embed);
    }
  
    encode().catch(error => {
      imports.message.channel.send("An error occured! "+ error);
    })
  }
};
