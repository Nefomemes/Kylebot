module.exports = (value, key, fields) => {
    switch (key.toLowerCase()) {
        case "kills":
            return fields.push({ name: 'Kills', value: `${value} kills`, inline: true });
        case "deaths":
            return fields.push({ name: 'Deaths', value: `${value} deaths`, inline: true });
        case "score":
            return fields.push({name: "Score", value: `${value}`, inline: true});
        case "timeplayed":
            return fields.push({name: "Time played", value: `${value}`, inline: true});
        case "scoreperminute":
            return fields.push({name: "SPM", value: `${value} scores/minute`, inline: true});
        case "kdratio":
            return fields.push({name: "KD Ratio", value: `${value}`, inline: true});
        case "headshots":
            return fields.push({name: "Headshots", value: `${value} times`, inline: true});
        case "distancetraveled":
            return fields.push({name: "Distance traveled", value: `${value}`, inline: true});
        case "damagedone":
            return fields.push({name: "Damage done", value: `${value}`, inline: true});
        case "killspergame":
            return fields.push({name: "Kills per game", value: `${value} kills`, inline: true});
        case "wallbangs":
            return fields.push({name: "Wallbangs", value: `$ {value} times`, inline: true});
            default:
           return fields.push({name: key, value: value, inline: true});
    
    }
}