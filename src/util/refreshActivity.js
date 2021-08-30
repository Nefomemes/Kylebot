module.exports = function refreshActivity(){
var activities = require("../assets/activities.json");
    let activity = activities[Math.floor(Math.random() * activities.length)];

    return client.user.setActivity(activity.content + ` | ${configs.prefix}help`, { type: activity.type }).catch(error => console.error(error));
} 