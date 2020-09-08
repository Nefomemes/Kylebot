module.exports.content = [
{
    "name":"Sexual",
    "desc":"Bad words that can be considered sexual. This type of badword will never be tolerated.",
    "id":"nsfw",
    "pt":10,
    "content":["araara", "aheglock", "ahegrau", "dildo", "ballsack", "analsex", "oralsex", "tit", "tits", "tete", "t3t3", "pu55y", "blowjob", "scrotum", "boob", "oppai", "sperm", "ngentod", "ngentot", "entot", "entod", "kontol", "k0nt0l", "womanbreast", "womenbreast", "vagina", "penis", "pen1s", "p3n1s", "v4g1n4", "loli", "shota", "ass", "a55", "sporm", "skrotum", "69", "berjantan", "nude", "nudity", "nudes", "bersetubuh", "menyetubuhi", "senggama", "sanggama", "nyetubuhi"]
    },
    {
        "name":"Racist",
        "pts":10,
        "desc":"Racist words that will never be tolerated.",
        "content":[
         "nigga", "nibba", "nigger"
            ]
    },
    {
        "name":"Rude",
        "pts":7,
        "desc":"Rude words.",
        "content":["shit", "fuck", "anjay", "anjir", "bangsat", "asu", "bitch", "blyat", "cyka"]
        
    }
    {
        "name":"Weebish",
        "pts":5,
        "desc":"List of badwords that are weebish. NSFW words goes to the NSFW category.",
        "content":["omyasumi", "chan", "sakuranomiya", "mikasaackerman", "leviackerman","onichan", "onechan", "harem", "megumin", "bokunoheroacademia", "kaguya", "urararaka", "midoriya", "deku", "waifu", "bakamonoga", "brrakaramonoga", "germansscienceisthefinest"]
    }
    ]
    
    // List of badwords that were put in this list to prevent mistakes in the filter.
    module.exports.prioritized = ["berak","ass", "pp", "tit", "tai", "69", "420", "69420", "42069", "anus", "asu", "tits", "waifu"]
    
// Badwords that are ignored in rule channel.
    
    module.exports.ignoreRuleChannel = [
        "sex", "69", "420", "69420", "42069", "nude", "nudity", "nudes"];

// Badwords that are ignored in NSFW channels.

    module.exports.ignoreNSFWChannel = [
        "sex", "oralsex", "analsex", "sperm", "penis", "vagina", "breast", "nude", "nudes", "nudity"]