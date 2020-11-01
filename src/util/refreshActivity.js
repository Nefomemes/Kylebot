module.exports = function refreshActivity(){
var activities = require("./activities.json");
    let activity = activities[Math.floor(Math.random() * activities.length)];

    return client.user.setActivity(activity.content + ` | ${require("./configs.json").prefix}help`, { type: activity.type }).catch(error => console.error(error));
} 