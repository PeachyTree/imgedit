// Copyright (©) 2020-2021 Shin#0484. All rights reserved. MIT License.

module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD LEAVE] Someone removed from ${guild.name} (${guild.id}), sadly.`);
  client.settings.delete(guild.id);
};
