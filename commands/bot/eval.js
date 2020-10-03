module.exports.run = async i => {
	const now = Date.now();
	if (!client.owners.cache.get(i.message.author.id)) return;

	if (!i.argv.code)
		return i.message.channel.send(
			'Add `--code=<code>` or `-code <code>`.\n\n If you need to add spaces. Use `--code="<code>"` or `-code  "<code>"  instead.'
		);
		
		
	i.argv.depth = parseInt(i.argv.depth);
	if (!i.argv.depth || Number.isNaN(i.argv.depth)) {
		i.argv.depth = 0;
	}
	async function evall() {
		return await eval(i.argv.code);

	}
	async function evaluate() {
		return await evall()
			.then(result => result)
			.catch(error => error);
	}
	evaluate().then(result => {
		const noww = Date.now();
		i.message.channel.send(`Process executed within ${noww - now}ms.`);
		i.message.channel.send(
			'```js\n' + i.trim(i.avoidBreak(i.args.join(' ')), 2000 - 12) + '\n```'
		);
		i.message.channel.send(
			'```js\n' +
				i.trim(
					i.avoidBreak(require('util').inspect(result, { depth: i.argv.depth })),
					2000 - 12
				) +
				'\n```'
		);
	});
};
