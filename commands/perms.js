module.exports = {
  name: "perms",
  category: "Information",
  description: "List all permission a user or role has.",
  usage: "nefo!perms [object] [scope]",
  explanation:
    "[object] should be changed with a user or role. You can use ID, mention, etc. The [scope] is another server that is avalable and the bot is in. It is required for you to be a member of the server before using it's scope. Just use the server ID to use it's scope.",
  example: "nefo!perms <@665419057075585025> 380289224043266048",
  permsreq: [],

  execute(imports) {
    
    }
};
