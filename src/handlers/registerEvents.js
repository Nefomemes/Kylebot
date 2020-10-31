module.exports = async function registerEvents() {
var path_idk = path.join(__dirname, 'events');
	let files = await fs.readdir(path_idk);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering events for ${path_idk}.`);
	for (let file of files) {
var path_idkb = path.join(__dirname, 'events', file);
		let stat = await fs.lstat(
		path_idkb
		);
		
		if (!stat.isDirectory() && file.endsWith('.js')) {
			if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${path_idkb} as an event.`);
			let eventName = file.substring(0, file.indexOf('.js'));
			client.on(
				eventName,
				require(global.path.join(__dirname, 'events', eventName))
			);
		} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is not a JS file. Ignoring.`);
	}
}