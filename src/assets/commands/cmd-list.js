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
                    "desc":"What you want to change, you can use either --user / --me or --guild / --server. If you use the server mode, you will be required to have the Manage Server permission.",
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
            "perm":7,
            "desc":"Enable or disable the badwords filter for the server. Requires the Manage Server permission.",
            "args":[
                {"name":"value",
                "desc":"The toggle for the command. You can either use 'on' or 'off'.",
                "optional":false
                }
                ]
        
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
                    "optional":"Use '-current' if you doesn't want to change the emblem."
                },
                {
                    "name":"playercard",
                    "desc":"The calling card you want.",
                    "optional":"Use -current if you doesn't want to change the calling card. "
                    }
                
                ]
        },
        {
            "name": "user",
            "category": "misc",
            "desc": "Get informations about a user.",
            "args": [
                {
                    "name":"user",
                    "desc":"The user, duh.",
                    "optional":true
                }
            ],
            "disabled": false,
            "aliases": ["userinfo"]
        },
        {
            "name": "betray",
            "type": "command",
            "category": "gifs",
            "desc": "Betray a friend.",
            "args":[
                {
                    "name":"users",
                    
                }
            ],
            "cooldown": 10,
    
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
            "disabled": false,
            "args": false

        },
        {
            "name": "emoji",
            "type": "command",
            "category": "Server Information",
            "description": "Get the information of a certain emoji.",
            "apiUsed": ["Discord"],
            "usage": "emoji <emoji>",
            "disabled": false,
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
