module.exports.run = async (i) => {
const supported =["webp", "png", "jpg", "jpeg", "gif"]
i.argv.user = await i.getUserFromMention(i.argv.user, client.users);
if (!supported.includes(i.argv.format))return i.message.channel.send("Invalid file type.");
if(!i.argv.user) return i.message.channel.send("Invalid user.");

var embed = new imports.Discord.MessageEmbed()
.setColor(i.colors.BG_COLOR)
.setAuthor(i.client.user.username, client.user.displayAvatarURL({format : "png", dynamic: true}), i.website)
.setDescription(`You can change the file type of the image by adding the file type as the argument. Note that animated avatars will remain a GIF. Default set to PNG.`)
.setImage(i.argv.user.displayAvatarURL({format: type || "png", dynamic: true}))
.setTimestamp()
.setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`, client.user.displayAvatarURL({format: "png", dynamic: true}))
    
    imports.message.channel.send(embed)
}