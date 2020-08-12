module.exports = {
    "type": "command_list",
    "content": [
        {
            "name":"desc",
            "desc":"Change the description of your profile or the server you are in.",
            "category":"profile",
            "args":[
                {
                    "name":"mode",
                    "desc":"What you want to change, you can use either --user / --me or --guild / --server",
                    "optional":false
                },
                {
                    "name":"desc",
                    "desc":"The description you want. Max 128 characters."
                }
                ]
        },
        {
            "name":"filter",
            "disabled":false,
            "category":"mod",
            "desc":"Enable or disable the badwords filter for the server.",
            "args":[
                {"name":"value",
                "desc":"The toggle for the command. You can either use 'on' or 'off'.",
                "optional":false
                }
                ]
        
        },
        {
            "name": "dbdisplay",
            "disabled": false,
            "category": "profile",
            
        },
        {
            "name": "dbset",
            "disabled": false,
            "category": "misc",
            "desc":"Set your calling card and emblem.",
            "args":[
                {
                    "name":"emblem",
                    "desc":"The emblem you want to use.",
                    "optional":"Use '--current' if you doesn't want to change the emblem."
                },
                {
                    "name":"playercard",
                    "desc":"The calling card you want.",
                    "optional":"Use --current if you doesn't want to change the calling card. "
                    }
                
                ]
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
            "name": "betray",
            "type": "command",
            "category": "gifs",
            "description": "Betray a friend.",
            "usage": "betray <user> [other-users]  [reason]",
            "example": "betray @Roach#8279 @Ghost#8676  I want to take down Makarov by myself.",
            "cooldown": 10,
            "av": "guild",
            "disabled": false
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
