module.exports = {
    trim: (string, max) => {
  if (string.length <= max) return string;
  return `${string.slice(0, max - 3)}...`;
    },
    getRandomFunfact: () => {
        const funfact = require("../configs/funfact.json").content;
  return funfact[Math.floor(Math.random() * funfact.length)]

    },
    customSplit: (str, maxLength) => {
  if(str.length <= maxLength)  return [str];
  var parts = str.match(new RegExp(".{1," + maxLength + "}","g"));
  return parts;
    },
    getMemberFromMention: (mention, message) => {
       
  if (!mention || !message || !message.guild) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
  }
 return message.guild.members.cache.get(mention);

    },
    getGuildChannelFromMention: (mention, message) => {

  if (!mention || !message || !message.guild) return;

  if (mention.startsWith("<#") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
}
    return message.guild.channels.cache.get(mention); 
    },
    getCommand: (commandName, options) => {
        

        if(options.constructor = Object && options.type && options.type === "module"){
            const commandModules = require("../configs/commands/cmd-list.json").content.filter(function(command){
                 return command.name && command.name.toLowerCase() === commandname.toLowerCase() ||command.aliases && command.aliases.includes(commandName.toLowerCase())
            })
                      if(!commandModules.length){
                    return;
                } else if(commandModules.length > 1){
                    return ;
                }
                return commandModules[0];
        } else if(options.constructor = Object && options.type && options.type === "command" && options.client){
            return options.client.commands.get(commandName);
        }
        return;
    },
    freshActivity: (client) => {
        activities = require("../configs/activities.json").content;
          let activity = activities[Math.floor(Math.random() * activities.length)];
 
  return client.user.setActivity(activity.content + ` | ${process.env.PREFIX}help`, {type: activity.type}).catch(error => console.error(error));
    }
}