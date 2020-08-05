module.exports = {
  name: "slowmode",
  category: "Moderation",
  description: "Change the slowmode the channel.",
  usage: "nefo!slowmode [channel] [slowmode-amount]",
  explanation:
    "The channel can be by it's ID or mention. The slowmode amount is in seconds. You will se a display bug where the slowmode is not displayed correctly.",
  example: ["nefo!slowmode 716266404323786832 3", "nefo!slowmode 3"],
  permissions: ["MANAGE_CHANNELS"],
  execute(imports) {
  }
};
