module.exports = {
 	aliases: ["e"],
	desc: "Run a code.",
	category: "b",
	run: async i => {
	const now = Date.now();
	if (!client.owners.cache.get(i.message.author.id)) return;

	
	
		
	
	i.argv.d = parseInt(i.argv.d);
	if (Number.isNaN(i.argv.d)) {
		i.argv.d = 0;
	}
	async function evall() {
		return await eval(i.argv.c || "");

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
<<<<<<< HEAD:src/commands/bot/eval.js
			'```js\n' + (__.trim(__.struction(i.argv.c || ""), 2000 - 12) || "‎") + '\n```'
=======
			'```js\n' + __.trim(__.struction(i.argv.c || ""), 2000 - 12) + '\n```'
>>>>>>> origin/dev:src/commands/bot/eval.js
		);
		i.message.channel.send(
			'```js\n' +
				__.trim(
					__.struction(util.inspect(result || null, { depth: i.argv.d })),
					2000 - 12
				) +
				'\n```'
		);
	});
}}