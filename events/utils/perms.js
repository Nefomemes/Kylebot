module.exports.checkPermission = (permsLevel, member) => {
if(!permsLevel || !member){
    let error = new Error("Not enough parameters.");
    error.name = "PermissionLevelError";
    throw error;
    return;
};
if(permsLevel.constructor !== Number || member.constructor !== require("discord.js").GuildMember){
    let error = new Error("Invalid parameter(s).");
    error.name = "PermissionLevelError";
    throw error;
    return;
}
    if(member.client.owners.cache.get(member.user.id))return true;
    
switch(permsLevel){
    case 0:
        return true;
    case 1:
        if(member.permissions.has("MANAGE_EMOJIS"))return true;
        break;
    case 2:
        if(member.permissions.has("MANAGE_NICKNAMES"))return true;
        break;
    case 3:
        if(member.permissions.has("KICK_MEMBERS"))return true;
        break;
    case 4:
        if(member.permissions.has("BAN_MEMBERS"))return true;
        break;
    case 5:
        if(member.permissions.has("MANAGE_CHANNELS"))return true;
        break;
    case 6:
        if(member.permissions.has("MANAGE_ROLES"))return true;
        break;
    case 7:
        if(member.permissions.has("MANAGE_GUILD"))return true;
        break;
    case 8:
        if(member.permissions.has("ADMINISTRATOR")) return true;
        break;
    case 9:
        if(member.user.id === member.guild.ownerID)return true;
        break;
    case 10:
    if(member.client.admins.cache.get(member.user.id))return true;
        break;
   
  
  default:
  return false;
}
}
