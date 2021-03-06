module.exports.run = async (imports) => {
    if (!imports.args.length) return imports.message.channel.send("You should provide an argument. Don't you know it, yeah?")
    const query = imports.querystring.stringify({ a: imports.args.shift() }).slice(2);

    var embed = new imports.Discord.MessageEmbed()
        .setColor("#CB3837")
        .setAuthor("Powered by Node Package Manager", "https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-large.png", "https://npmjs.com/")
        .setThumbnail("https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-large.png")
        .setTimestamp()
        .setFooter(`Prefix: ${imports.prefix} | ${imports.getRandomFunfact()}`, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }));
    var fields = [];
    const res = await imports.fetch(`http://registry.npmjs.org/${query}`).then(i => i)
    if (!res.ok) return imports.message.channel.send(`Ugh, sir. We got error ${res.status}, "${res.statusText}", copy.`);
    var package = await res.json();
    if(package.error) return imports.message.channel.send("NPM Registry returned an error! " + package.error);
    embed = embed.setTitle(`"${package.name}" NPM Package Insight`)
        .setURL(package.homepage)
        .setDescription(package.description)
    var versions = Object.keys(package.versions);
    var latest_version = versions.pop();
    versions.push(latest_version);
    var dependencies = Object.keys(package.versions[latest_version].dependencies);
    fields.push(
        { name: "ID", value: package["_id"], inline: true },
        { name: "Author", value: package.author.name, inline: true },
        { name: "Licence", value: package.licence || "Unlisenced", inline: true },
        { name: "Created at", value: new Date(package.time.created).toUTCString(), inline: true },
        { name: "Last modified at", value: new Date(package.time.modified).toUTCString(), inline: true },
        { name: "Tags", value: (package.tags || []).join(", ") || "No tags", inline: true },
        { name: "README length (really)", value: `${(package.readme || "").length} characters`, inline: true },
        { name: "Maintainers", value: imports.trim(`${package.maintainers.length} maintainers, consisting ${package.maintainers.map(i => i.name).join(", ")}.`, 1024), inline: true },
        { name: "NPM page", value: `[Click here](${require("url").resolve("https://npmjs.com/package", package["_id"])})`, inline: true },
        { name: "Latest version", value: latest_version, inline: true },
        { name: "Dependencies", value: imports.trim(`${dependencies.length} dependencies, consisting ${dependencies.join(", ")}`, 1024), inline: true });
    if (package.bugs && package.bugs.url) {
        fields.push(/* Property name here uses blank character. "‎" */ { name: "‎", value: `[Report Bugs](${package.bugs.url})`, inline: true })
    }
    let number = parseInt(imports.args.pop());
    if (Number.isNaN(number) || !number) {
        number = 1;
    }
    let page = imports.getPage(fields, 6, number);
    embed = embed.setFooter(
        imports.trim(
            `Page ${page.page}/${page.pages} | ${embed.footer.text}`,
            2048
        )
    );
    for (let field of fields) {
        let index = fields.indexOf(field);
        if (!(index > page.end || index < page.start)) {
            embed = embed.addField(
                (field.name || 'unknown').toString(),
                '||' + (field.value || 'unknown').toString() + '||',
                field.inline
            );
        }
    }
    return imports.message.channel.send(embed);


}