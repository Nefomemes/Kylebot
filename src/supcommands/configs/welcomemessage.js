
module.exports = {
	description: "Configure the message that will be sent when a member joined.",
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-welcomemessage-welcomemessage",
	run: async i => {
		
 if(!i.args.length) return i.message.channel.send("Unlike some other commands, you just need to type the message content that will be sent whenever a user joined the server.");

 
 return i.message.channel.send("Nicely done. Ez pz.");
 if(i.argv.m){
 	var message =  i.argv.m;
 	
 	if(typeof message !== "string") return i.message.channel.send("The `m` option is required to be a string.");
 	if(message.length > 500) return i.message.channel.send("To prevent abuse and to save database resources, we restrict message content to only 500 characters.");
 	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$set: {welcomeMessage: message}});
 } else if(i.argv.rm && i.argv.rm === true){
 	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$unset: {welcomeMessage: ""}});
 } else {
 	const guildD  = await db.collection ("guilds").getDoc({docID: i.message.guild.id});
 	
  return i.message.channel.send(`Current welcome message: ${guildDB.welcomemeMessage || "none"}\n\nTo change the welcome message, add the \`m\` option with the message.\nTo get rid of it set the \`rm\` option to true.`);
 	
 }
 	
	}
}
