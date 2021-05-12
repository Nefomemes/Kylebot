module.exports = async function registerCommands(
	dir = path.join(process.__maindir, 'commands'),
	commandCache = client.commands.cache,
	type = 'command',
	defaultSettings = {}
<<<<<<< HEAD
){
var files = await fs.readdir(dir);
for(let file of files){
	var filedir = path.join(dir, file);
	let stat = await fs.lstat(filedir);

	if(stat.isDirectory()){
		var configs;
		try {
			 configs = require(path.join(filedir, "configs.json"));
		} catch {}

		if(configs && configs.hasChilds){

			
		file = file.toLowerCase();
			let supcommand = {
				...configs,
				type: type,
				id:  file,
				name: file,
				commands: new Discord.Collection()
			};

			await registerCommands(
				filedir,
				supcommand.commands,
				type,
				{
					...defaultSettings,
					...configs.default
				}

			);

		supcommand.commands = supcommand.commands.map(childcommand => {
			childcommand.id = `${supcommand.id}#${childcommand.name}`;
			return childcommand;
		})

			commandCache.set( file, supcommand);

		} else {

			registerCommands(filedir, commandCache, type, {...defaultSettings, ...(configs|| {}).default});

		}
		
			
	} else {

		if(file.endsWith(".js")){
			var commandFile;
			try {
				commandFile = require(filedir);
			} catch (e) {
				console.warn(e);
			}
			if(commandFile){

			let commandName = file.slice(0, -3);


			if (commandFile.run) {
				let command = {
					...defaultSettings,
			...commandFile,
					name: commandName,
					type: type,
					id: commandName
				};
				commandCache.set(commandName, command);
					if(process_argv.dev && process_argv.dev === true) console.log(`${path_idkb} is a valid command file.`);
			} else if(process_argv.dev && process_argv.dev === true) console.log(`${path_idkb} doesn't have a run property. Ignoring.`);
			
		}}

	}
}
}
=======
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

>>>>>>> origin/dev
