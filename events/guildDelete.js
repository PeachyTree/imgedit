module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD LEAVE] I got removed from ${guild.name} (${guild.id}), sadly.`);
  client.settings.delete(guild.id);
};
