module.exports = {
	name: "ready",
	async run(client, log) {
		client.log.info(`Ready! On Version: ${process.env.version}`);
		client.editStatus("dnd", {
			name: "Project New!",
			type: 1,
			url: "https://www.twitch.tv/gamearoo_streams",
		});
	},
};
