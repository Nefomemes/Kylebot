module.exports.run = async (i) => {
const supported =["webp", "png", "jpg", "jpeg", "gif"]
i.argv.user = await i.getUserFromMention(i.argv.u, client.users) || i.message.author;
i.argv.format = i.argv.f || "png";
if (!supported.includes(i.argv.format))return i.message.channel.send("Invalid file type.");
if(!i.argv.user) return i.message.channel.send("Invalid user.");

var embed = new Discord.MessageEmbed()
.setColor(i.colors.BG_COLOR)
.setAuthor(i.client.user.username, client.user.displayAvatarURL({format : "png", dynamic: true}), i.website)
.setDescription(`You can change the file type of the image by adding the file type as the argument. Note that animated avatars will remain a GIF. Default set to PNG.`)
.setImage(i.argv.user.displayAvatarURL({format: i.argv.format || "png", dynamic: true}))
.setTimestamp()
.setFooter(`Prefix: ${i.prefix} | ${i.getRandomFunfact()}`, client.user.displayAvatarURL({format: "png", dynamic: true}))
    
    i.message.channel.send(embed)
}