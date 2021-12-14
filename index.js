const BotClient = require("./src/client");

require("dotenv").config();

new BotClient().run("FAKE", "./commands");
