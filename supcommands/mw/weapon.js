const mwstarter = require("../mwstarter");

const weapons = require(require("path").join(process.cwd(), "assets/weapons.json"));
module.exports = {
    desc: 'Get the information of a Call of Duty: Modern Warfare player.',
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md#prefixmw-mode-option-",
    run: async (i) => mwstarter(i =>  async i => {

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
        var k = 6;
        var weaponStats = {};
        _.each(o.lifetime.itemData, (value, key) => {
            if (!key.startsWith("weapon_")) return;
            return _.each(value, (v, k) => {
                return weaponStats[k] = v;
            })
        })
        if (i.argv.weapon) {

            var weapon;
            if (weaponStats[i.argv.weapon] || weaponStats[i.argv.weapon.slice("weapon_").length] || weaponStats["iw8_" + i.argv.weapon]) {
                weapon = i.argv.weapon
            } else {
             
                let foobar = [];
                for (const [key, value] of Object.entries(weapons)) {
                    if(value.toLowerCase() === i.argv.weapon.toLowerCase() || value.toLowerCase().split(i.argv.weapon.toLowerCase())[1]){
                        foobar.push({ key: key, value: value });
                    }

                }
        
                if (!foobar.length) return i.message.channel.send("There are no gun with that name or id.");
                weapon = foobar[0].key;
                
            }
            if (!weaponStats[weapon]) return i.message.channel.send("There are no weapons with that name or id.");
            embed = embed.setImage(`https://www.callofduty.com/cdn/app/weapons/mw/icon_cac_weapon_${weapon.slice(4)}.png`)
                .setTitle(`${weapons[weapon] || weapon} stats for ${embed.title}`)
            _.each(weaponStats[weapon].properties, (value, key) => {
                return fields.push({ name: key, value: value, inline: true });
            })
        } else {
            k = 4;
            _.each(weaponStats, (v, k) => {
                fields.push({ name: weapons[k] || k, value: i.trim(`**Kills**: ${v.properties.kills} kills\n**Deaths**: ${v.properties.deaths} deaths\n**KD ratio**: ${v.properties.kdRatio}\n**Shots**:${v.properties.shots} shots\n**Hits**:${v.properties.hits} hits\n**Accuracy**:${v.properties.accuracy}`, 1024) })
            })

        }


        let number = parseInt(i.argv.page);
        if (Number.isNaN(number) || !number) {
            number = 1;
        }
        let page = i.getPage(fields, k, number);
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

})
};
