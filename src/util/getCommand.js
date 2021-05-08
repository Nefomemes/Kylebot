module.exports = function getCommand(str, commandCache) {
<<<<<<< HEAD
	if (!str || !commandCache) return;

	return commandCache.find(command => {
		return 	command.name.toLowerCase() === str.toLowerCase() ||
			command.aliases && command.aliases.includes(str.toLowerCase())
		;
	});
};
=======
    if (!str || !commandCache) return;
    return commandCache.get(str.toLowerCase()) || commandCache.find((command) => { return command.aliases && command.aliases.includes(str.toLowerCase()) });
  }
>>>>>>> origin/dev
