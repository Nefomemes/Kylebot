module.exports = {
    "type": "command_list",
    "content": [
        {
            "name":"filter",
            "disabled":false,
            "category":"misc"
        
        },
        {
            "name": "dbdisplay",
            "disabled": false,
            "category": "misc"
        },
        {
            "name": "dbset",
            "disabled": false,
            "category": "misc"
        },
        {
            "name": "search",
            "description": "Search something in the Internet. Returns in the link though.",
            "category": "misc",
            "usage": "search <arg>",
            "explanation": "None",
            "example": "search Never Gonna Give You Up",
            "cooldown": 5,
            "disabled": false
        },
        {
            "name": "user",
            "category": "misc",
            "description": "Get informations about a user.",
            "usage": "user [user] ",
            "disabled": false,
            "aliases": ["userinfo"]
        },
        {
            "name": "ac130",
            "category": "killstreak",
            "description": "Call in an AC-310. Good for roleplay servers.",
            "usage": "ac310",
            "example": "ac310",
            "aliases": ["gunship"],
            "guildcmd": true,
            "cooldown": 15,
            "permissions": [],
            "bot_permissions": ["MANAGE_WEBHOOKS"],
            "type": "command",
            "guild": true,
            "disabled": true,
            "args": false

        },
        {
            "name": "adminnuke",
            "type": "command",
            "category": "mods",
            "description": "Clear all messages in a text channel by duplicating and deleting the channel.",
            "usage": "adminnuke [channel]",
            "explanation": "The permission required does not applies on the guild owner.",
            "cooldown": 30,
            "permissions": ["ASMINISTRATOR"],
            "bot_permissions": ["MANAGE_CHANNELS", "MANAGE_WEBHOOKS"],
            "guild": true,
            "args": false,
            "disabled": true
        },

        {
            "name": "ban",
            "type": "command",
            "category": "mods",
            "description": "Ban a user. Make sure you respect free speech and bla bla bla.",
            "usage": "ban <member>",
            "example": "ban @Weeb Bot#8279",
            "permissions": ["BAN_MEMBERS"],
            "bot_permissions": ["BAN_MEMBERS"],
            "guild": true,
            "args": true,
            "disabled": true
        },
        {
            "name": "betray",
            "type": "command",
            "category": "GIFs",
            "description": "Betray a friend.",
            "usage": "betray <user> [other-users]  [reason]",
            "example": "betray @Roach#8279 @Ghost#8676  I want to take down Makarov by myself.",
            "cooldown": 10,
            "guild": true,
            "disabled": false
        },

        {
            "name": "bmkg",
            "type": "command",
            "category": "Misc Commands",
            "description":
                "Get the Indonesian weather and earthquake forecast from the Indonesian Meteorogical, Climatological, and Geophysical agency.",
            "usage":
                "nefo!bmkg <province>\n\nCase sensitive and you must use the Indonesian name.\n\nIt must be an Indonesian province. Does not support other countries. Sorry, 'muricas.\n\nFunfact, you can get the overall data if you does not give any arguments or you put `Indonesia` as the argument.\n\nYou can also get the latest news about earthquake by simply using `earthquake` as the argument.",
            "example": ["nefo!bmkg DKI Jakarta", "nefo!bmkg Indonesia", "nefo!bmkg earthquake"],
            "disabled": true,
            "args": true
        },
        {
            "name": "botinfo",
            "type": "command",
            "category": "bot",
            "description": "Shows information about the bot. Including the bot's ping and invite link",
            "usage": ["nefo!botinfo"],
            "example": ["nefo!botinfo"],
            "aliases": ["stats", "ping", "latency", "uptime", "invite"],
            "disabled": false,
            "guild": false,
            "args": false

        }, {
            "name": "channel",
            "type": "command",
            "category": "Server Information",
            "description": "Get the information of a channel.",
            "usage": " channel [channel]",
            "guild": true,
            "disabled": true,
            "args": false

        },

        {
            "name": "drake",
            "type": "command",
            "category": "Mematic",
            "description": "Make a simple with the Drake format.",
            "usage": "drake",
            "disabled": true,
            "args": false
        },
        {
            "name": "emoji",
            "type": "command",
            "category": "Server Information",
            "description": "Get the information of a certain emoji.",
            "apiUsed": ["Discord"],
            "usage": "emoji <emoji>",
            "disabled": true,
            "args": true

        },
    

        {
            "name": "eval",
            "type": "command",
            "category": "Insiders",
            "description": "Evaluate a code.",
            "usage": "eval <code>",
            "args": true,
            "disabled": false
        },
        {
            "name": "happy",
            "category": "rp",
            "description": "Use this whenever you are happy.",
            "usage": "happy [reason]",
            "disabled": false,
            "type": "command"

        },
        {
            "name": "walk",
            "category": "rp",
            "description": "When you want to uninstall Ukraine.",
            "usage": "happy [reason]",
            "disabled": false,
            "type": "command"
        },
        {
            "name": "help",
            "type": "command",
            "category": "bot",
            "description": "Shows all the commands available",
            "usage": "nefo!help [command-or-page-number]",
            "example": ["nefo!help 1", "nefo!help nuke"],
            "aliases": ["commands"],
            "explanation": "When no arguments are given, it will send the main help page.",
            "disabled": false
        },
        {
            "type": "command",
            "name": "kick",
            "category": "Moderation",
            "description": "Kick a member. They will be able to join the server again with a new invite.",
            "usage": "nefo!kick <member> reason",
            "example": "nefo!kick @Joe Mama#7686",
            "guild": true,
            "permissions": ["KICK_MEMBERS"],
            "disabled": true,
            "bot_permissions": ["KICK_MEMBERS"]

        },
        {
            "name": "kill",
            "category": "rp",

            "description": "Kill an enemy.",
            "usage": "nefo!kill <members> reason",
            "disabled": false,
            "explanation":
                "No ID accepted. Member mentions only. You can give the reason after all the mention mumbo jumbo ends.",
            "example": "nefo!kill @Vladimir Makarov#8573 this is for Soap"
        },
        
        {
            "name": "perms",
            "category": "Server Information",
            "type": "command",
            "description": "Check the perms of a user / role.",
            "usage": [],
            "disabled": true
        },

    
        {
            "name": "prefix",
            "category": "Bot",
            "description": "Just a scrapped command. It will be used when the database is ready.",
            "disabled": true,
            "type": "command"
        },

    
        {
            "name": "respect",
            "type": "command",
            "category": "rp",
            "description": "F",
            "usage": "nefo!respect <member> [reason]",
            "example": "nefo!respect @Dead Bot#8493 Down.",
            "disabled": false,
            "cooldown": 7,
            "args": true
        },
        {
            "name": "say",
            "type": "command",
            "category": "Misc Commands",
            "description": "Ask the bot to say anything in the chat. ",
            "usage": "nefo!say [channel] <message>",
            "example": ["nefo!say 718625509516378152 Never Gonna Give You Up"],
            "explanation":
                "You can use the channel's ID. Or mention the channel. When no destinations given, it will send the message in the channel the command was executed and delete the message. Embeds are not yet supported.",
            "permsreq": ["ADMINISTRATOR"],
            "disabled": true,
            "args": true,
            "guild": true
        }, {
            "name": "bunker",
            "category": "Nefomemes' Coding Bunker Exclusive",
            "description": "Create a bunker for you.",
            "usage": "bunker",
            "guild": true,
            "cooldown": 30,
            "disabled": true,
            "type": "command"
        },
        {
            "name": "speedaudit",
            "category": "Audit",
            "description": "Audit the message rate of a channel.",
            "usage": "speedaudit [channel]",
            "cooldown": 15,
            "disabled": true,
            "type": "command"
        },
        {
            "name": "urbandefine",
            "category": "misc",
            "description":
                "Get a definition from Urban Dictionary. The bot does not support NSFW definitions whatsoever.",
            "usage": "nefo!urbandefine <word>",
            "example": "nefo!urbandefine Rick Roll",
            "cooldown": 30,
            "type": "command",
            "disabled": false
        },
        {
            "name": "wttr",
            "category": "Information",
            "description": "Get the weather forecast for a place using the wttr.in API.",
            "usage": "nefo!wttr <api>",
            "example": "nefo!wttr Old Zealand",
            "cooldown": 10,
            "type": "command",
            "disabled": true
        },
        {
            "name": "server",
            "category": "misc",
            "description":
                "Get the information of a server by it's ID. If no arguments given, it will return with the information of the server the command is executed.",
            "guild": true,
            "type": "command",
            "disabled": false
        },
        {
            "cooldown": 7,
            "type": "command",
            "name": "steamuser",
            "disabled": false,
            "category": "misc"
        },
        {
            "name":"daily",
            "disabled":false,
            "category":"plunder",
            "description":"Get your daily money with this command!"
        }

    ]
}
