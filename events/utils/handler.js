


async function handleMessage( message, oldMessage) {
    
    try  {
        
var i = {
    ...global.configs,
    ...global,
    ...global.built_ins,
   opt: {}
  }
    i.message = message;
    if ((!i.message.author || i.message.author.bot)) return;

   // i.filter = require("./filter").run(i).catch(console.error);

    if (!i.message.content.startsWith(i.prefix)) return;
    if(oldMessage && oldMessage.content === message.content)return;
    i.args = i.message.content.slice(i.prefix.length).split(/ +/);
    
    i.commandName = i.args.shift().toLowerCase();
    i.rawArgv = require("string-argv").parseArgsStringToArgv(i.args.join(" "))
	i.argv = require("minimist")(i.rawArgv);
    if (!i.commandName) return;
    
    i.command = i.getCommand(i.commandName, i.client.commands.cache);
    if(!i.command) return;
    if(i.command.type && i.command.type === "supcommand"){
    	
        var cmdname = i.args[0]
        if(cmdname && i.getCommand(cmdname, i.command.commands)){
            var name = i.command.name;
            i.command = i.getCommand(cmdname, i.command.commands);
           if(!i.command) return;
            i.command.name = `${name}#${i.command.name}`;
            i.args.shift()
        } else {
            i.args = [i.command.name, i.args.pop()];
            return client.commands.cache.get("help").run(i).catch(e => {
                return i.message.channel.send(i.errorEmbed(e));
            })
        };
    }
    if (!i.command || i.command.disabled && i.command.disabled === true) return;
    if (i.filter && i.filter === true) return;
    if (i.command.dev && i.command.dev === true && !(i.admins.includes(i.message.author.id) || i.admins === i.message.author.id)) return;
    if (!i.message.guild && (i.command.av && (i.command.av === "guild") || i.command.wbh || i.command.perms || i.command.bot_perms)) return i.message.channel.send("That command is only available in servers!");

    if (i.message.guild) {
        if (i.command.av && i.command.av === "dm") return i.message.channel.send("This command is only available in DM! Perhaps due to privacy reasons?");
        if (i.command.perms && !Number.isNaN(parseInt(i.command.perms))) {
            const permission = require("./perms").checkPermission(i.command.perms, i.message.member);
            if(permission !== true) return i.message.channel.send("Missing permissions. Permission level " + i.command.perms + ".")
        }

        if (i.command.bot_perms) {
            let permits = i.command.bot_permissions.filter((perm) => { return !i.message.guild.me.hasPermission(perm) });
            if (permits.length) return i.message.channel.send(imports.trim("The bot need these permissions before proceeding: " + permits.join(", "), 2000));
        }
        if (i.command.wbh && i.message.channel.fetchWebhooks().then(wbh => wbh.length) > 10 - i.command.wbh) return i.message.channel.send(`This channel have reached it's maximum amount of webhooks possible. Please clear them up before proceeding.`);
    }
    if (!i.client.cooldowns.cache.has(i.command.name)) {
        i.client.cooldowns.cache.set(i.command.name, new Discord.Collection());
    }
    i.now = Date.now();
    i.timestamps = client.cooldowns.cache.get(i.command.name);
    i.cooldownAmount = (i.command.cooldown || 5) * 1000;
    i.expirationTime = i.timestamps.get(i.message.author.id) + i.cooldownAmount;
    i.timeLeft = (i.expirationTime - i.now) / 1000;

    if (i.timestamps.has(i.message.author.id) && i.now < i.expirationTime) {
        if (i.options && i.opt.bypassSlowmode && i.opt.bypassSlowmode === true && i.message.author.id === "") {
            // Bypass
        } else {
            return i.message.channel.send(`Slowmode! Please wait another ${i.timeLeft.toFixed(2)} seconds.`);
        }
    }

    i.timestamps.set(i.message.author.id, i.now);
    setTimeout(() => {
        if (i.timestamps.has((i.message.author || {id: 141}).id)) {
            i.timestamps.delete(i.message.author.id);
        }
    }, i.cooldownAmount);

        i.command.run(i).catch(e => {
           const embed = i.errorEmbed(e);
    return i.message.channel.send(embed);

        })
    
    
} catch(e){
 const embed = i.errorEmbed(e);
    return i.message.channel.send(embed);
}
    
}

module.exports = handleMessage;
