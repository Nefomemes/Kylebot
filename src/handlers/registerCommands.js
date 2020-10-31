module.exports = async function registerCommands(
	dir = path.join(process.pwd(), 'commands'),
	commandCache = client.commands.cache,
	type = 'command',
	defaultSettings = {}
) {
	var path_idk = dir;
	var files = await fs.readdir(path_idk);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${type}s of ${path_idk}`);
	for (let file of files) {
	
	
		let stat = await fs.lstat(path_idkb);
		if (stat.isDirectory()) {
			if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a folder. Registering commands inside of it.`);
			registerCommands(path.join(dir, file), commandCache, type, defaultSettings);
			}

		else if (file.endsWith('.js')) {
			if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a JS file. Checking if it's a valid command.`);
			let commandCode = require(path.join(__dirname, dir, file));
			let commandName = file.substring(0, file.indexOf('.js'));


			if (commandCode.run) {
				let command = {
					...defaultSettings,
			...commandCode,
					name: commandName,
					type: type
				};
				commandCache.set(commandName, command);
			} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} doesn't have a run property. Ignoring.`);
			
		} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is neither a JS file or a folder. Ignoring.`);
	}
}

