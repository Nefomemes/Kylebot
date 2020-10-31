module.exports = {
	run: async (i) => {
		const user = await db.collection("users").getDoc({docID: i.message.author.id});

		
	}
}