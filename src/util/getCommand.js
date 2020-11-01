module.exports = function getCommand(str, commandCache) {
    if (!str || !commandCache) return;
    return commandCache.get(str.toLowerCase()) || commandCache.find((command) => { return command.aliases && command.aliases.includes(str.toLowerCase()) });
  }