module.exports = {
  name: "user",
  category: "Information",
  description: "Get informations about a user.",
  usage: "```nefo!user [user] ",

  aliases: ["userinfo"],
  execute(
    message,
    args,
    client,
    fs,
    Canvas,
    getRandomFunfact,
    figlet,
    translate,
    Discord,
    fetch,
    querystring,
    xml2js,
    killtreaks_utils,
    got,
    FileType,
    sizeOf,
    trim,
    getMemberFromMention,
    probe,
    http,
    imagesize,
    timestamps,
    customSplit
  ) {
    var user, member;
    if(message.guild){
      user = getMemberFromMention(args[0], message).user || message.guild.members.cache.get(args[0]) || message.author;
      member = getMemberFromMention(args[0], message) || message.guild.members.cache.get(args[0])|| message.member;
    }else{
      user = message.author;
    }

    var embed = new Discord.MessageEmbed()
    .setColor("#7829da")
    .setTitle(`${user.username}#${user.discriminator}`)
    .setAuthor("Nefomemes#3927", "https://i.imgur.com/jymG4L1.png", "https://nefomemes.herokuapp.com/nefobot")
    .setThumbnail(user.displayAvatarURL({format: "png", dynamic: true}))
    .addFields(  
                {name: "ID", value: `${user.id}`, inline: true}, 
                {name: "Accout created at", value: user.createdAt}, 
                {name: "Presence Status", value: user.presence.status, inline: true}, 
                {name: "Client type", value: user.presence.clientStatus, inline: true},
                {name: "Bot", value: user.bot})
    .setFooter(`Prefix: nefo! | ${getRandomFunfact()}`)

                if(message.guild){
                  embed.addFields({name: "Joined the server since", value: member.joinedAt},
                                  {name: "Display name", value: member.displayName})
                  if(member.displayColor){
                    embed.addField( "Display color (Base 10)", member.displayColor, true);
                  }                
                  if(member.displayHexColor){
                    embed.setColor(member.displayHexCOlor)
                    embed.addField("Display color(Hex)", member.displayHexColor, true);
                  } 
                  if(member.premiumSince){
                    embed.addField("Boosting the server since", member.premiumSince);
                  } 
                  if(member.roles){
                    embed.addField("Highest roles", member.roles.highest);
                    if(member.roles.hoist){
                      embed.addField("Hoist role (the role that separate the user from other online users)", member.roles.hoist, true);
                    }
                  } 

                  message.channel.send(embed);
                  
                }
  }
};
