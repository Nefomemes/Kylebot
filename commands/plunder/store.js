module.exports = {
    name: "store",
    run: async (imports) => {

        const user = await imports.db.getDoc('users', imports.message.author.id);
        var embed = new imports.Discord.MessageEmbed()
            .setColor(imports.colors.BG_COLOR)
            .setTitle("Store")
            .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setTimestamp()
            .setFooter(`Prefix: ${imports.prefix} | You have ${user.cp || 0} CP and  ${user.cash || 0} Plunder cash.`)
        const bundles = imports.getItem("bundle", null, "all").filter((bundle) => {
            if (bundle.available && bundle.available === false) return false;
            return true;
        })
        if (imports.getItem('bundle', imports.args[0])) {
            var all = true;
            imports._.each(imports.getItem('bundle', imports.args[0]), (value, key) => {
                if(key && key === "assets" && value.constructor === Array  && value[0] && value[0].asset){
                    embed = embed.setImage(value[0].asset || false);
                } else if(false /*key && key === "contents"*/){
                    for(let content of value){
                        embed = embed.addField(content.name, "yes", true);
                    }
                } else if(all === true){
                    embed = embed.addField(key || "Unknown", value || "<redacted>", true);
                }
            })
        } else {
            for (let bundle of bundles) {
                let user_can_buy;
                if (user.cp && user.cp !== 0 && bundle.price && (user.cp - bundle.price) >= 0) {
                    user_can_buy = "";
                } else {
                    user_can_buy = "**Sadly, you doesn't not enough funds. :cry:**\n";
                }

                embed = embed.addField(bundle.name || "Unknown", imports.trim(`ID: ${bundle.id || "<redacted>"}\n\n${user_can_buy} This bundle costs ${bundle.price || "<redacted>"} <:cp:744403130594230313>. ${bundle.desc || "<redacted>."}`, 1024), true);
            }
        }

        return imports.message.channel.send(embed);
    }

}