module.exports = {
    execute(imports){
             var words = imports.message.content.split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
  
  var violates = words.filter(function(value, index, arr){ return badwords.includes(value.toLowerCase())});
  violates = violates.filter(function(value, index, arr){ return value.toLowerCase() !== "classic"  });
  
  if(imports.message.guild && violates.length /* && the function that will get if the guild activates it's badwords filter or not.*/){
  const verb_warnings = new imports.Discord.MessageEmbed()
  .setColor(require("./assets/configs/color.json").content.BG_COLOR)
  .setTitle("Content Deletion")
  .setAuthor(imports.message.guild.name + " Moderation System", imports.message.guild.iconURL({format: "png", dynamic: true}))
  .setDescription(imports.built_ins.trim("Our content moderation system have flagged one of your message contains badword(s).However, this wont affect you at all (except the message you sent, though) until we have implemented database to the bot.", 2048))
  .addFields({name: "Issued content", value:"```" + imports.message.content + "```", inline: true},
            {name: `${violates.length} badwords issued`, value: "```" + violates.join(", ") + "```", inline: true})
  .setFooter(`Prefix: ${process.env.PREFIX} | ` + imports.built_ins.getRandomFunfact(), imports.client.user.displayAvatarURL({format: "png", dynamic: true}))  
const author = imports.message.author;

imports.message.delete()
author.send(verb_warnings).catch(error => {

})



    }
}