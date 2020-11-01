const trim = require("./trim");

module.exports = function embedPagify(embed, opts = {}){
	let number = parseInt(opts.page);
	embed.fields = [];
	if (Number.isNaN(number) || !number) {
		number = 1;
	}
	let pages = _.chunk(embed.fields, opts.length || 6);
	
	embed = embed.setFooter(
		trim(`Page ${number}/${pages.length} ${(() => {
			if(embed.footer && embed.footer.text) return ` | ${embed.footer.text}`

			return "";
		})()}`, 2048)
	);
if(pages[number]){
	for (let field of pages[number]) {
		embed.addField(field.name, field.value, field.inline);
	}
}
return embed;
}