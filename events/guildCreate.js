module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD JOIN] I've got added to ${guild.name} (${guild.id})! Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.settings.set(guild.id, client.defaults);
};
