module.exports = {
    name: "speedaudit",
    cooldown: 30,
    run: async(imports)=> {
     
              
const channel = imports.getChannelFromMention(imports.args[0]) || imports.message.guild.channels.cache.get(imports.args[0]) || imports.message.channel;
if(!channel.permissionsFor(imports.message.author.id).has("VIEW_AUDIT_LOG"))return message.channel.send("You need to have the View Audit Log permission to audit the channel!");
imports.message.react("<a:DiscordLoading:724125571847815229").then(reaction => {
        const filter = m => !m.author.bot;
const collector = channel.createMessageCollector(filter);
setTimeout(function(){
    collector.stop();
}, 120000)
var msgs_without_slowmode = [], msgs_with_slowmode = [], users_with_slowmode = [], users_without_slowmode = [];
collector.on('collect', m => {
 if(imports.message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") || imports.message.channel.permissionsFor(message.member).has("MANAGE_CHANNEL")){
    if(!users_without_slowmode.includes(m.member)){ 
    users_without_slowmode.push(m.member);
    }
     msgs_without_slowmode.push(m);
 } else {
     if(!users_with_slowmode.includes(m.member)){
     users_with_slowmode.push(m.member);
     }
     msgs_with_slowmode.push(m);
 }
});

collector.on('end', collected => {
    let embed = new imports.Discord.MessageEmbed()
    .setColor(imports.colors.BG_COLOR)
    .setTitle("Slowmode audit for #" + channel.name )
    .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
    .setDescription("Here are the result of the audit.")
    .setTimestamp()
    .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({format:"png", dynamic: true}))
    if(users_with_slowmode || users_without_slowmode){
        embed.addFields({name: "Total messages rate by all users", value: ((msgs_with_slowmode.length + msgs_without_slowmode.length)/ 120).toFixed(2) + " msg/s", inline: true},
        {name: "Total messages rate by all non-ratelimited users", value: ((msgs_without_slowmode.length) / 120).toFixed(2) + " msg/s", inline: true},
        {name: "Total messages rate by all ratelimited users", value: ((msgs_with_slowmode.length)/ 120).toFixed(2), inline: true},
        {name: "Average messages rate sent by a user", value: ((msgs_with_slowmode.length + msgs_without_slowmode.length) / (users_with_slowmode.length + users_without_slowmode.length) / 120).toFixed(2) + " msg/s", inline: true}, 
       {name: "Average messages rate sent by a non-ratelimited user", value: (msgs_without_slowmode.length / users_without_slowmode.length / 120).toFixed(2) + " msg/s", inline: true},
       {name: "Average messages rate sent by a ratelimited user", value: ((msgs_with_slowmode.length / users_with_slowmode.length) / 120).toFixed(2) + " msg/s", inline: true})
    } else {
        embed.setDescription("It seems the channel is dead lol.");
    }
    imports.message.channel.send(embed);
    reaction.remove();
});
});
    }
}