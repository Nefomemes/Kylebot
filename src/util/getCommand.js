module.exports = function getCommand(str, commandCache) {
	if (!str || !commandCache) return;

	return commandCache.find(command => {
		return 	command.name.toLowerCase() === str.toLowerCase() ||
			command.aliases && command.aliases.includes(str.toLowerCase())
		;
	});
};
