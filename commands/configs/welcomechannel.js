module.exports.run = async (imports) => {
var channel = await imports.getChannelFromMention(imports.args.shift(), imports.message.guild.channels);
var message;
if(!channel){
 message = "Please send a text channel that you want to use it as the welcome channel, yeah.";
} else if(!channel.permissionsFor(imports.client.user.id).has("SEND_MESSAGES")){
message = "I can't send messages to this channel. Please provide a channel that I can send messages in.";
} else if(channel.type !== "text"){
    message = "This channel is not a text channel. Please provide a text channel, yeah.";
} else if(imports.tryout > 10){
    return imports.message.channel.send("You've sent too many invalid channels. Please try again.")
}

if(message){
    imports.tryout++;
    imports.messsage.channel.send((message || "Please send a text channel.").toString());
    const filter = (m) => m.author.id === imports.message.author.id;
    const collector = imports.message.channel.createMessageCollector(filter, {time: 120000});
    collector.on((m) => {
        const ch = await imports.getChannelFromMention(m.content, imports.message.guild.channels);
        if(ch && ch.id){
            imports.args = [ch.id];
           
        } else {
            imports.args = m.content;
        }
        imports.client.commands.cache.get("welcomechannel").run(imports)
    })
     
}
}
module.exports.perms = 7;