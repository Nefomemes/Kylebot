module.exports.run = (imports) => {
const supported =["webp", "png", "jpg", "jpeg", "gif"]
const type = (imports.args[1]  || "png").toLowerCase();
if (!supported.includes(type))return imports.message.channel.send("Invalid file type.")
var user = imports.getUserFromMention(imports.args[0], imports.client) || imports.message.author;
var embed = new imports.Discord.MessageEmbed()
.setColor(imports.colors.BG_COLOR)
.setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format : "png", dynamic: true}), imports.website)
.setDescription(`You can change the file type of the image by adding the file type as the argument. Note that animated avatars will remain a GIF. Default set to PNG.`)
.setImage(user.displayAvatarURL({format: "png", dynamic: true}))
.setTimestamp()
.setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: type, dynamic: true}))
    
    imports.message.channel.send(embed)
}