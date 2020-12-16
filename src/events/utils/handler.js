


async function handleMessage( message, oldMessage) {
    
    try {

    var i = {
	    ...global.__
    };



    if(oldMessage && oldMessage.content === message.content) {
	    return;
    } else {
	 message = await message.channel.messages.fetch(message.id);
    }
    if(!message.content.startsWith(configs.prefix) || message.author.bot) return;

    i.message = message;
	i.args = message.content.split(" ");
	
	
	let commandName = i.args.shift();
	if(!commandName) return;
	commandName = commandName.slice(configs.prefix.length);
	
	let command = __.getCommand(commandName.toLowerCase(), client.commands.cache);
	if(!command){
		// Filter commands;
	return message.channel.send("No command with that name");
	}
	if(command.type === "supcommand"){
console.log(command.commands);
let childcommand = __.getCommand((i.args.shift() || `index`).toLowerCase(), command.commands);

		if(!childcommand){
			// Filter commands
			return;
		}

		command = childcommand;
		

	} 

	if((command.guild || typeof command.perms === "number") && !i.message.guild) return message.channel.send("This is a DM-only command.");

	if(message.member && typeof command.perms === "number"){
		var hasAccess = require("./perms").checkPermission(command.perms, message.member);

		if(!hasAccess) return i.message.channel.send("You don't have access to this command.");

	}

	if(command.dev && !configs.owners.includes(message.author.id)) return i.message.channel.send("This command is not available for public.");
	
	if(!client.cooldowns.cache.has(command.id)){
		client.cooldowns.cache.set(command.id, new Discord.Collection())
	}
i.argv = require("mri")(require('shell-quote').parse(i.args.join(" ")));
	var now = Date.now();
	const timestamps = client.cooldowns.cache.get(command.id);
const cooldownAmount = (command.cooldown || 5) * 1000;

if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more seconds to be able to use this command again.`);
	}
}
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	i.command = command;
	command.run(i).catch(e => {
	 const embed = __.errorEmbed(e);
 console.error(e);
    return message.channel.send(embed);
	});


    
} catch(e){
 const embed = __.errorEmbed(e);
 console.error(e);
    return message.channel.send(embed);
}



    
}

module.exports = handleMessage;
