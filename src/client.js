const { Client, Collection } = require("eris");

const { createLogger, format, transports, level } = require("winston");
const { consoleFormat } = require("winston-console-format");

const logger = createLogger({
	level: "silly",
	format: format.combine(
		format.timestamp(),
		format.ms(),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "Test" },
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.padLevels(),
				consoleFormat({
					showMeta: true,
					metaStrip: ["timestamp", "service"],
					inspectOptions: {
						depth: Infinity,
						colors: true,
						maxArrayLength: Infinity,
						breakLength: 120,
						compact: Infinity,
					},
				})
			),
		}),
	],
});

class BotClient extends Client {
	constructor() {
		super(`${process.env.token}`, {
			intents: ["guildMessages"],
		});
		this.events = new Collection();
		this.log = logger;

		["event"].forEach((hand) => {
			require(`./utils/${hand}`)(this);
		});
	}
	run(token, cmd) {
		this.on("error", (err) => {
			this.log.error(err);
		});
		this.on("ready", async () => {
			this.events.get("ready").run(this, logger);
		});

		this.connect();
	}
}

module.exports = BotClient;
