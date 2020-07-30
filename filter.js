module.exports = {
    execute(imports){
        const badwords = require("./assets/configs/badwords").content;
             var words = imports.message.content.toLowerCase().split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
  
  var violates = badwords.word.filter((badword) => {
  if(badwords.prio.includes(badword))return words.includes(badword);
  return words.join("").split(badword)[1];
  })
 
  if(imports.message.guild && violates.length && db.getDoc('guilds', imports.message.guild.id).filter){
  const verb_warnings = new imports.Discord.MessageEmbed()
  .setColor(imports.colors.BG_COLOR)
  .setTitle("Content Deletion")
  .setAuthor(imports.message.guild.name + " Moderation System", imports.message.guild.iconURL({format: "png", dynamic: true}))
  .setDescription(imports.built_ins.trim("Our content moderation system have flagged one of your message contains badword(s).However, this wont affect you at all (except the message you sent, though) until we have implemented database to the bot.", 2048))
  .addFields({name: "Issued content", value:"```" + imports.message.content + "```", inline: true},
            {name: `${violates.length} badwords issued`, value: "```" + violates.join(", ") + "```", inline: true})
  .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))  
const author = imports.message.author;

imports.message.delete()
author.send(verb_warnings).catch(error => {

})



}}
}