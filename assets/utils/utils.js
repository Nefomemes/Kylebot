
module.exports = {
  trim: (string, max) => {
    if (string.length <= max) return string;
    return `${string.slice(0, max - 3)}...`;
  },
  getRandomFunfact: () => {
    const funfact = require("../configs/funfact").content;
    return funfact[Math.floor(Math.random() * funfact.length)]

  },
  customSplit: (str, maxLength) => {
    if (str.length <= maxLength) return [str];
    var parts = str.match(new RegExp(".{1," + maxLength + "}", "g"));
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
  getChannelFromMention: (mention, message) => {

    if (!mention || !message || !message.guild) return;

    if (mention.startsWith("<#") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
    }
    return message.guild.channels.cache.get(mention);
  },
  getCommand: (cmd, options) => {
    if (!cmd) return;
    if (!options.type) return;
    if (options.constructor = Object && options.type && options.type === "module") {
      const commandModules = require("../configs/commands/cmd-list").content.filter(function (command) {
        return command.name && command.name.toLowerCase() === cmd.toLowerCase() || command.aliases && command.aliases.includes(cmd.toLowerCase())
      })
      if (!commandModules.length) {
        return;
      } else if (commandModules.length > 1) {
        return;
      }
      return commandModules[0];
    } else if (options.constructor = Object && options.type && options.type === "command" && options.client) {
      return options.client.commands.get(cmd);
    }
    return;
  },
  freshActivity: (client) => {
    activities = require("../configs/activities").content;
    let activity = activities[Math.floor(Math.random() * activities.length)];

    return client.user.setActivity(activity.content + ` | ${require("../configs/configs").prefix}help`, { type: activity.type }).catch(error => console.error(error));
  },
  avoidBreak: (str) => {
    if (str.constructor !== String || !str) return;
    return str.split("```").join("`‎`‎`‎");
  },
  getPlayercard: (name) => {
    const playertag = require("../items/playercards").content;
    name = (name || "default").toLowerCase();

    if (name === "default") {
      let result = playertag.filter((value) => {
        return value.default && value.default === true;
      })
      if (!result.length) return;
      return result[Math.floor(Math.random() * result.length)];
    } else {
      let result = playertag.filter((value) => {
        return value.id && value.id === name || value.name.toLowerCase().startsWith(name) || value.name.toLowerCase().endsWith(name) || value.name.split(name)[1];
      })
      if (!result.length) return;
      return result[Math.floor(Math.random() * result.length)];
    }
  },
  getEmblem: (name) => {

    const emblems = require("../items/emblems");
    name = (name || "default").toLowerCase();

    if (name === "default") {
      let result = emblems.filter((value) => {
        return value.default && value.default === true;
      })
      if (!result.length) return;
      return result[Math.floor(Math.random() * result.length)];
    } else {
      let result = emblems.filter((value) => {
        return value.id && value.id === name || value.name.toLowerCase().startsWith(name) || value.name.toLowerCase().endsWith(name) || value.name.split(name)[1];
      })
      if (!result.length) return;
      return result[Math.floor(Math.random() * result.length)];
    }
  },
  getPage: (array, length, page)=> {
    if(!array || array.constructor !== Array)return;
    if(!length || length.constructor !== Number)return;
    if(!page || page.constructor !== Number)return;
    page--;
    let l = length - 1;
    let start = 0 + (length * page);
    let end = l + (length * page);    
    if(end  >= array.length) {
end = array.length - 1;
}
    return {start: start, end: end};
  }

}