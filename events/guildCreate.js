// Copyright (©) 2020 Azura Apple. All rights reserved. MIT License.

module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD JOIN] Someone added me to ${guild.name} (${guild.id})! Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.settings.set(guild.id, client.defaults);
};
