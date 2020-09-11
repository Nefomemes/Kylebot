module.exports.audit = async (string) => {
    const badwords = require(global.path.join(process.cwd(), "assets/configs/badwords")).content;
             var words = string.toLowerCase().split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
  var violates = badwords.word.filter((badword) => {
 if(  badwords.prio.includes(badword))return words.includes(badword);
  return words.join("").split(badword)[1];
  })
  return violates;
}
module.exports.run = async (imports) => {
        return new Promise((resolve, reject) => {
            try {
   (async function(){
        
  var violates = module.exports.audit(imports.message.content);
 if(await imports.message.guild && await violates.length){
      let guild = await imports.db.getDoc('guilds', imports.message.guild.id);
if(await !guild.filter || guild.filter === false) return resolve(true); 
  const verb_warnings = await new imports.Discord.MessageEmbed()
  .setColor(await imports.colors.BG_COLOR)
  .setTitle("Content Deletion")
  .setAuthor(await imports.message.guild.name + " Moderation System", await imports.message.guild.iconURL({format: "png", dynamic: true}))
  .setDescription(await imports.trim("Our content moderation system have flagged one of your message contains badword(s).However, this wont affect you at all (except the message you sent, though) until we have implemented database to the bot.", 2048))
  .addFields({name: "Issued content", value:"```" + imports.message.content + "```", inline: true},
            {name: `${violates.length} badwords issued`, value: "```" + violates.join(", ") + "```", inline: true})
  .setFooter(`Prefix: ${await imports.prefix} | ${await imports.getRandomFunfact()}`, await imports.client.user.displayAvatarURL({format: "png", dynamic: true}))  
const author = await imports.message.author;

await imports.message.delete().catch(e => e)
await author.send(verb_warnings).catch(e => e)
resolve(true)
 } else {
      resolve(false); 
 } 
  })()
  } catch (e){
      reject(e);
  }
     })
}

