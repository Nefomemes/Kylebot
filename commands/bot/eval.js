module.exports.run = async i => {
	const now = Date.now();
	if (!client.owners.cache.get(i.message.author.id)) return;
	var args = require('minimist')(i.args);
	if (!args.eval)
		return i.message.channel.send(
			'Add `--code=<code>` or `-code <code>`.\n\n If you need to add spaces. Use `--code="<code>"` or `-code ' <
				code >
				'`  instead.'
		);
	args.depth = parseInt(args.depth);
	if (!args.depth || Number.isNaN(args.depth)) {
		args.depth = 0;
	}
	async function evall() {
		return await eval(args.code);
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
		imports.message.channel.send(
			'```js\n' +
				i.trim(
					i.avoidBreak(require('util').inspect(result, { depth: args.depth })),
					2000 - 12
				) +
				'\n```'
		);
	});
};
