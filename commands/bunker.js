module.exports = {
    name: "bunker",
    execute(message,
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
        customSplit){
      
     

      var overwrite = {
        CREATE_INSTANT_INVITE: true,
        KICK_MEMBERS: true,
        BAN_MEMBERS: true,
        ADMINISTRATOR: true,
        MANAGE_CHANNELS: true,
        MANAGE_GUILD: true,
        ADD_REACTIONS: true,
        VIEW_AUDIT_LOG: true,
        PRIORITY_SPEAKER: true,
        STREAM: true,
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: true,
        MANAGE_MESSAGES: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        MENTION_EVERYONE: true,
        USE_EXTERNAL_EMOJIS: true,
        VIEW_GUILD_INSIGHTS: true,
        CONNECT: true,
        SPEAK: true,
        MUTE_MEMBERS: true,
        DEAFEN_MEMBERS: true,
        MOVE_MEMBERS: true,
        USE_VAD: true,
        CHANGE_NICKNAME: true,
        MANAGE_NICKNAMES: true,
        MANAGE_ROLES: true,
        MANAGE_WEBHOOKS: true,
        MANAGE_EMOJIS: true
      };
      const command = args.shift().toLowerCase();
      if(command === "create"){

        message.guild.channels.create(`「🤖」${message.member.displayName}'s bunker`, {type: "text", parent:message.guild.channels.cache.get("729832634275856444")}).then(channel => {
            channel.createOverwrite(message.author, overwrite).catch(error =>{
                message.channel.send("An error occured but the channel have been created! " + error)
            }).then(channel => {message.channel.send(`Done! ${channel} have been created!`);});
        }).catch(error => {
            message.channel.send(`An error occured! ${error}`);
        });
        message.guild.channels.create(`「🤖」${message.member.displayName}'s bunker`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: overwrite,
                },
            ],
            parent:message.guild.channels.cache.get("729832634275856444")
        }).then(channel => {
            message.channel.send(`Done! ${channel} have been created!`);
        }).catch(error => {
            message.channel.send(`An error occured! ${error}`);
        });
    } 
    else if(command === "admin"){
        function getRolesFromMention(cnl, msg){
            let channel = cnl;
            if(!channel.startsWith("<#") && !channel.endsWith(">"))return;
            return msg.guild.roles.cache.get(channel.slice(2, channel.length - 1));
        };
        var bunker = args.shift();
        var user = args.shift();
        if(!bunker || !user)return message.channel.send("Invalid arguments.");
        user = getMemberFromMention(user, message) || message.guild.members.cache.get(user) || getRolesFromMention(user, message) || message.guild.roles.cache.get(user);
        if(!user)return message.channel.send("Invalid user.");
        function getChannelFromMention(cnl, msg){
            let channel = cnl;
            if(!channel.startsWith("<#") && !channel.endsWith(">"))return;
            return msg.guild.channels.cache.get(channel.slice(2, channel.length - 1));
        };
        bunker = getChannelFromMention(bunker, message) || message.guild.channels.cache.get(bunker);
        if(!bunker)return message.channel.send("Invalid bunker.");
        if(!bunker.parent || bunker.parent && bunker.parent.id !== "729832634275856444")return message.channel.send("It seems that is a public bunker.")
        if(!bunker.permissionsFor(message.author.id).has("ADMINISTRATOR")) return message.channel.send("You doesn't have Administrator permissions in that bunker!");
        message.channel.send("Are you sure you want to give this user / role full permissions of the " + bunker.name + " channel? \n\nThis action is irreversible unless you contacted an admin.\n\n Send `yes` to proceed or `no` to cancel, in the next 120 seconds.")
        const filter = a => a.author.id === message.author.id && a.content.toLowerCase() === "yes" || a.author.id === message.author.id && a.content.toLowerCase() === "no";
        const collector = message.channel.createMessageCollector(filter, {timeout: 120000});
        var status = 0;
        collector.once('collect', msg =>{
        if(msg.content.toLowerCase() === "yes"){
            // Give the admin perms.
            bunker.updateOverwrite(user, overwrite).then(() => {
                message.channel.send("Done! The user / role have been given the Administrator permissions.")
                
            }).catch(error => {
                message.channel.send("An error occured!" + error)
            })
            status = 1;
            collector.stop()
        } else if(msg.content.toLowerCase() === "no"){
            message.channel.send("Ok. Command canceled.");
            status = 1;
            collector.stop();
        }
        })
        collector.on('end', () => {
            if(status = 0)return message.channel.send("Command timed out.");
        });
    }
    }
}