const registerCommands = require("./registerCommands");

module.exports = async function registerSuperCommands(
	dir = path.join(process.__maindir, 'supcommands'),
	commandCache = client.commands.cache,
	type = 'supcommand'
) {
	let path_idk = dir;
	var files = await fs.readdir(path_idk);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${type}s of ${path_idk}.`);
	for (let file of files) {
		var path_idkb = path.join( dir, file);
		let stat = await fs.lstat(path_idkb);
		if (stat.isDirectory()) {
		if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a folder. Registering it.`);
			let supcommand = {};
			var settings = {};
			try {
				settings = require(path.join(dir, file, 'settings.json'));
				delete settings.name;
			} catch {}
			
			var name  = file;
			supcommand = {
				...settings,
				type: type,
				id:  name,		name: name,
				commands: new Discord.Collection()
			};

			await registerCommands(
				path.join(dir, file),
				supcommand.commands,
				'childcommand',
				settings
			);

		supcommand.commands = supcommand.commands.map(childcommand => {
			childcommand.id = `${supcommand.name}#${childcommand.name}`;
			return childcommand;
		})

			await commandCache.set( file.toLowerCase(), supcommand);
		} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is not a folder. Ignoring.`);
	}
}