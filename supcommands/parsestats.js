module.exports = (value, key, fields) => {
    switch (key.toLowerCase()) {
        case "kills":
            return fields.push({ name: 'Kills', value: `${value} kills`, inline: true });
        case "deaths":
            return fields.push({ name: 'Deaths', value: `${value} deaths`, inline: true });
        case "score":
            return fields.push({name: "Score", value: `${value}`, inline: true});
        case "timePlayed":
            return fields.push({name: "Time played", value: `${value}`, inline: true});
        case "scorePerMinute":
            return fields.push({name: "SPM", value: `${value} scores/minute`, inline: true});
        case "kdRatio":
            return fields.push({name: "KD Ratio", value: `${value}`, inline: true});
        case "headshots":
            return fields.push({name: "Headshots", value: `${value} times`, inline: true});
        case "distanceTraveled":
            return fields.push({name: "Distance traveled", value: `${value}`, inline: true});
        case "damageDone":
            return fields.push({name: "Damage done", value: `${value}`, inline: true});
        case "killsPerGame":
            return fields.push({name: "Kills per game", value: `${value} kills`, inline: true});
            default:
            return fields.push({ name: `${modes[key] || key}`, value: i.trim(`**Kills**: ${value.properties.kills} kills\n**Deaths**: ${value.properties.deaths} deaths\n**Score**: ${value.properties.score} scores\n**KD**: ${value.properties.kdRatio}\n**SPM**: ${value.properties.scorePerMinute} scores/min`, 1024), inline: true });
    }
}