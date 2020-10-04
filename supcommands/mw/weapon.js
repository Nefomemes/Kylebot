const modes = require(require("path").join(process.cwd(), "assets/weapons.json"));
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

        const supports = {
            activision: 'uno',
            acti: 'uno',
            psn: 'psn',
            xbl: 'xbl',
            battle: 'battle',
            pc: 'battle',
            ps4: 'psn',
            ps5: 'psn',
            xbox: 'xbl',
            ps: 'psn',
            uno: 'uno'
        };
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

            _.each(o.lifetime.itemData, (value, key) => {
                if(!key.statsWith("weapon_")) return;
                return _.each(value, (v, k) => {
                    fields.push({name: weapons[k] || k, value: i.trim(`**Kills**: ${v.properties.kills} kills\n**Deaths**: ${v.properties.deaths} deaths\n**KD ratio**: ${v.properties.kdRatio}\n**Shots**:${v.properties.shots} shots\n**Hits**:${v.properties.hits} hits\n**Accuracy**:${v.properties.accuracy}`, 1024)})
                })
            })

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
