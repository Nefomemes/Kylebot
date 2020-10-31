module.exports.execute = async (i) => {
	
	i.app.get("/", (req, res) => {
		try {
		var obj = {
			username: client.user.username,
			discriminator: client.user.discriminator,
			client: client.user.id,
			readyAt: client.readyAt.getTime(),
			ping: client.ws.ping,
			users: client.users.cache.size,
			guilds: client.guilds.cache.size,
			avatar: client.user.displayAvatarURL({format: "png", dynamic: true})
		}
		return res.send(obj);
		} catch {
			return res.send("200 - OK");
		}
	})


	i.app.all("*", (req, res) => res.status(404).send("404 - Not Found"));
}