const supports = require("./platform.json");
const weapons = require(require("path").join(process.cwd(), "assets/weapons.json"));
module.exports = {
    desc: 'Get the information of a Call of Duty: Modern Warfare player.',
    run: async i => {

        if (!i.argv.player)
            return i.message.channel.send(
                "Looks like you're searching for John Cena. Add `--player=<gamertag>` or `-player <gamertag>` to look fo their stats."
            );
        if (!i.argv.platform)
            return i.message.channel.send(
                "You haven't specified a platform to look for the player. Add `--platform=<platform>` or `-platform <platform>`."
            );


        var platform = supports[i.argv.platform];
        if (!platform)
            return i.message.channel.send(
                "Platform doesn't exist or isn't supported yet. Try again."
            );

        return codAPI.MWstats(i.argv.player, platform).then(o => {
            if (typeof o === 'string') return i.message.channel.send('Message: ' + i);
            var embed = new Discord.MessageEmbed()
                .setColor(i.colors.BG_COLOR)
                .setAuthor(
                    'Call of Duty: Modern Warfare',
                    'https://i.imgur.com/HMU8AmJ.png'
                )
                .setThumbnail('https://i.imgur.com/HMU8AmJ.png')
                .setTitle(o.username)
                .setFooter(
                    i.getRandomFunfact(),
                    client.user.displayAvatarURL({ format: 'png', dynamic: true })
                );
            var fields = [];

            var weaponStats = {};
            _.each(o.lifetime.itemData, (value, key) => {
                if (!key.startsWith("weapon_")) return;
                return _.each(value, (v, k) => {
                    return weaponStats[k] = v;
                })
            })
            if (i.argv.weapon) {
                var weapon;
                if (weapons[i.argv.weapon] || weaponStats[i.argv.weapon]) {
                    weapon = i.argv.weapon
                } else {
                 
                    let foobar = [];
                    for (const [key, value] of Object.entries(weapons)) {
                        foobar.push({ key: key, value: value });
                    }
                    foobar = foobar.filter((oj) => {
                        return oj.value && (oj.value.toLowerCase() === i.argv.weapon.toLowerCase() || oj.value.toLowerCase().split(i.argv.weapon.toLowerCase())[1]);
                    })
                    if (!foobar.length) return i.message.channel.send("There are no gun with that name or id.");
                    weapon = foobar[0].key;
                    
                }
                if (weaponStats[weapon]) return i.message.channel.send("There are no weapons with that name or id.");
                embed = embed.setImage(`https://www.callofduty.com/cdn/app/weapons/mw/icon_cac_weapon_${weapon.slice(4)}.png`)
                    .setTitle(`${weaponStats[weapon] || weapon} stats for ${embed.title}`)
                _.each(weaponStats[weapon].properties, (value, key) => {
                    return fields.push({ name: key, value: value, inline: true });
                })
            } else {

                _.each(weaponStats, (v, k) => {
                    fields.push({ name: weapons[k] || k, value: i.trim(`**Kills**: ${v.properties.kills} kills\n**Deaths**: ${v.properties.deaths} deaths\n**KD ratio**: ${v.properties.kdRatio}\n**Shots**:${v.properties.shots} shots\n**Hits**:${v.properties.hits} hits\n**Accuracy**:${v.properties.accuracy}`, 1024) })
                })

            }


            let number = parseInt(i.argv.page);
            if (Number.isNaN(number) || !number) {
                number = 1;
            }
            let page = i.getPage(fields, 6, number);
            embed = embed.setFooter(
                i.trim(`Page ${page.page}/${page.pages} | ${embed.footer.text}`, 2048)
            );
            for (let field of fields) {
                let index = fields.indexOf(field);
                if (!(index > page.end || index < page.start)) {
                    embed = embed.addField(
                        `${field.name}`,
                        `${field.value}`,
                        field.inline
                    );
                }
            }
            return i.message.channel.send(embed);
        });
    }
};
