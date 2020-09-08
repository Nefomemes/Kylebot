
module.exports = {
  trim: (string, max) => {
    if (string.length <= max) return string;
    return `${string.slice(0, max - 3)}...`;
  },
  getRandomFunfact: () => {
    const funfact = require("./configs/funfact").content;
    return "WIP Internal Alpha"+ " | "+ funfact[Math.floor(Math.random() * funfact.length)]

  },
  customSplit: (str, maxLength) => {
    if (str.length <= maxLength) return [str];
    var parts = str.match(new RegExp(".{1," + maxLength + "}", "g"));
    return parts;
  },
  getMemberFromMention: (mention, GuildMemberManager) => {

    if (!mention || !GuildMemberManager) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
    try {
    return GuildMemberManager.fetch(mention).catch(e => null);
} catch {
    return;
}
  },
  getChannelFromMention: (mention, GuildChannelManager) => {

    if (!mention || !GuildChannelManager) return;
    if (mention.startsWith("<#") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
    }
    return GuildChannelManager.fetch(mention);
  },
  freshActivity: (client) => {
    activities = require("./configs/activities").content;
    let activity = activities[Math.floor(Math.random() * activities.length)];

    return client.user.setActivity(activity.content + ` | ${require("./configs/configs").prefix}help`, { type: activity.type }).catch(error => console.error(error));
  },
  avoidBreak: (str) => {
    if (str.constructor !== String || !str) return;
    return str.split("```").join("`‎`‎`‎");
  },
  getItem: (collection, item, type) => {
    if (!collection) return;
    var items;
    try {
       items = require(`./items/${collection}s`).content;
      
  } catch {
    return;
    }
      if(type && type.toLowerCase() === "all") return items;
      item = (item || "default").toLowerCase();
      if (item === "default") {
        let result = items.filter((value) => {
          return value.default && value.default === true;
        })
        if (!result.length) return;
        return result[Math.floor(Math.random() * result.length)];
      } else {
        let result = items.filter((value) => {
          return value.id && value.id === item || value.name && (value.name.toLowerCase().startsWith(item) || value.name.toLowerCase().endsWith(item) || value.name.split(item)[1]);
        })
        if (!result.length) return;
        return result[Math.floor(Math.random() * result.length)];
      }
  },
  getCommand: (str, client) => {
    if (!str || !client) return;
    return client.commands.cache.get(str.toLowerCase()) || client.commands.cache.find((command) => { return command.aliases && command.aliases.includes(str.toLowerCase()) });
  },
  getPage: (array, length, page) => {
    if (!array || array.constructor !== Array) return;
    if (!length || length.constructor !== Number) return;
    if (!page || page.constructor !== Number) return;
    page--;
    let l = length - 1;
    let start = 0 + (length * page);
    let end = l + (length * page);
    if (end >= array.length) {
      end = array.length - 1;
    }
    page++;
var pages_length = (array.length / length).toFixed(0)
if(pages_length <= 0) pages_length = 1;
    return { start: start, end: end, array:  array, length: length, page: page, pages: pages_length};
  },
  getUserFromMention: (mention, client) => {
    if (!mention ||!client) return;
    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
  
  return client.users.fetch(mention).catch(e => null);
 
  }
}
