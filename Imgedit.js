// Copyright (©) 2020 Azura Apple. All rights reserved. MIT License.

require('dotenv').config();
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const client = new Discord.Client();
const { IMGEDIT_TOKEN, IMGEDIT_PREFIX } = process.env;

// Client Settings
client.config = require("./config.json");
client.logger = require("./modules/logger");
require("./modules/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({ name: "settings" });
client.defaults = {
  prefix: IMGEDIT_PREFIX
};

const init = async () => {
  // Loading commands 
  const cmdFiles = await readdir("./commands/");
  client.logger.log("info", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Loading Event Files
  const evtFiles = await readdir("./events/");
  client.logger.log("info", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.login(IMGEDIT_TOKEN);
};

init();
