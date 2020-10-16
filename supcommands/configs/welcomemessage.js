
module.exports = {
	description: "Configure the message that will be sent when a member joined.",
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomemessage-welcomemessage",
	run: async i => {
 if(!i.args.length) return i.message.channel.send("Unlike some other commands, you just need to type the message content that will be sent whenever a user joined the server.");
 
 if(i.args.join(" ").length > 500) return i.message.channel.send("To prevent abuse and to save database resources, we restrict message content to only 500 characters.");
 8
 await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$set: {welcomeMessage: i.trim(i.args.join(" "), 500)}})
 
 return i.message.channel.send("Nicely done. Ez pz.");
 
 	
	}
}
