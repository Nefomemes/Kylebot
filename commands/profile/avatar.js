module.exports.run = async (imports) => {
const supported =["webp", "png", "jpg", "jpeg", "gif"]
var user = await imports.getUserFromMention(imports.args[0], imports.client.users);
var ok = false;
var type;
if(!user) {
user = await imports.getUserFromMention(imports.args[1], imports.client.users);
if(user){
 type = (imports.args[0]  || "png").toLowerCase();

} else {
    user = imports.message.author;
    ok = true; 
} 
} else { ok = true; }
if(ok){
     type = (imports.args[1]  || "png").toLowerCase();
}
if (!supported.includes(type))return imports.message.channel.send("Invalid file type.")
if(!user) return imports.message.channel.send("Invalid user, sir.");

var embed = new imports.Discord.MessageEmbed()
.setColor(imports.colors.BG_COLOR)
.setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format : "png", dynamic: true}), imports.website)
.setDescription(`You can change the file type of the image by adding the file type as the argument. Note that animated avatars will remain a GIF. Default set to PNG.`)
.setImage(user.displayAvatarURL({format: type || "png", dynamic: true}))
.setTimestamp()
.setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
    
    imports.message.channel.send(embed)
}