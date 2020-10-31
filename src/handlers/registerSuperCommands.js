const registerCommands = require("./registerCommands");

module.exports = async function registerSuperCommands(
	dir = 'supcommands',
	commandCache = client.commands.cache,
	type = 'supcommand'
) {
	let path_idk = path.join(__dirname, dir);
	var files = await fs.readdir(path_idk);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${type}s of ${path_idk}.`);
	for (let file of files) {
		var path_idkb = path.join(__dirname, dir, file);
		let stat = await fs.lstat(path_idkb);
		if (stat.isDirectory()) {
		if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a folder. Registering it.`);
			let supcommand = {};
			var settings = {};
			try {
				settings = require(path.join(__dirname, dir, file, 'settings.json'));
				delete settings.name;
			} catch {}
			supcommand = {
				...settings,
				type: type,
				name: file,
				commands: new Discord.Collection()
			};

			await registerCommands(
				path.join(process.pwd(), "supcommands", file),
				supcommand.commands,
				'childcommand',
				settings
			);
			await commandCache.set(file, supcommand);
		} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is not a folder. Ignoring.`);
	}
}