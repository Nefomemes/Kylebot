async function handleMessage(imports, message) {
    message.latency = Date.now();
    imports.message = message;
    if ((!imports.message.author || imports.message.author.bot)) return;

    imports.filter = require("./filter").run(imports).catch(console.error);

    if (!imports.message.content.startsWith(imports.prefix)) return;
    imports.args = imports.message.content.slice(imports.prefix.length).split(/ +/);
    imports.commandName = imports.args.shift().toLowerCase();
    if (!imports.commandName) return;
    imports.command = imports.getCommand(imports.commandName, imports.client);


    if (!imports.command || imports.command.disabled && imports.command.disabled === true) return;
    if (imports.filter && imports.filter === true) return;
    if (imports.command.dev && imports.command.dev === true && !(imports.admins.includes(imports.message.author.id) || imports.admins === imports.message.author.id)) return;
    if (!imports.message.guild && (imports.command.av && (imports.command.av === "guild") || imports.command.wbh || imports.command.perms || imports.command.bot_perms)) return imports.message.channel.send("That command is only available in servers!");

    if (imports.message.guild) {
        if (imports.command.av && imports.command.av === "dm") return imports.message.channel.send("This command is only available in DM! Perhaps due to privacy reasons?");
        if (imports.command.perms) {
            let permits = imports.command.perms.filter((perm) => { return !imports.message.member.hasPermission(perm) });
            if (permits.length) return imports.message.channel.send(imports.trim("You needs to have these permissions before proceeding: " + permits.join(", "), 2000));
        }

        if (imports.command.bot_perms) {
            let permits = imports.command.bot_permissions.filter((perm) => { return !imports.message.guild.me.hasPermission(perm) });
            if (permits.length) return imports.message.channel.send(imports.trim("The bot need these permissions before proceeding: " + permits.join(", "), 2000));
        }
        if (imports.command.wbh && imports.message.channel.fetchWebhooks().then(wbh => wbh.length) > 10 - imports.command.wbh) return imports.message.channel.send(`This channel have reached it's maximum amount of webhooks possible. Please clear them up before proceeding.`);
    }
    if (!imports.client.cooldowns.cache.has(imports.command.name)) {
        imports.client.cooldowns.cache.set(imports.command.name, new Discord.Collection());
    }
    imports.now = Date.now();
    imports.timestamps = imports.client.cooldowns.cache.get(imports.command.name);
    imports.cooldownAmount = (imports.command.cooldown || 5) * 1000;
    imports.expirationTime = imports.timestamps.get(imports.message.author.id) + imports.cooldownAmount;
    imports.timeLeft = (imports.expirationTime - imports.now) / 1000;

    if (imports.timestamps.has(imports.message.author.id) && imports.now < imports.expirationTime) {
        if (imports.options && imports.opt.bypassSlowmode && imports.opt.bypassSlowmode === true && imports.message.author.id === "") {
            // Bypass
        } else {
            return imports.message.channel.send(`Slowmode! Please wait another ${imports.timeLeft.toFixed(2)} seconds.`);
        }
    }

    imports.timestamps.set(imports.message.author.id, imports.now);
    setTimeout(() => {
        if (imports.timestamps.has(imports.message.author.id)) {
            imports.timestamps.delete(imports.message.author.id);
        } else { }
    }, imports.cooldownAmount);
    try {
        imports.command.run(imports).catch(e => {
            throw e
        })
    } catch (e) {
        if (!(e.message === "Cannot read property 'catch' of undefined" && e.name === "TypeError")) {
            imports.message.channel.send("```" + built_ins.trim(require("util").inspect(e), 2000 - 6) + "```")
        }
    }
}

module.exports = handleMessage;