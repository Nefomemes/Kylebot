module.exports = async function registerCommands(
	dir = path.join(process.cwd(), 'src', 'commands'),
	commandCache = client.commands.cache,
	type = 'command',
	defaultSettings = {}
) {

	var files = await fs.readdir(dir);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${type}s of ${dir}`);
	for (let file of files) {
	
		let path_idkb = path.join(dir, file);
		let stat = await fs.lstat(path_idkb);
		if (stat.isDirectory()) {
			if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a folder. Registering commands inside of it.`);
			registerCommands(path.join(dir, file), commandCache, type, defaultSettings);
			}

		else if (file.endsWith('.js')) {
			if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a JS file. Checking if it's a valid command.`);
			let commandCode = require(path.join( dir, file));
			let commandName = file.slice(0, -3);


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

