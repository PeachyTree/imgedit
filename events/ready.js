const { activityMessages } = require('./assets/json/activities');

module.exports = async (client) => {

  client.guilds.forEach(guild => {
    if (!client.settings.has(guild.id)) {
      client.settings.set(guild.id, client.defaults);
    }
  });

  client.logger.log("info", `[READY] Ready and online as: ${client.user.tag}.`, "ready");

  (function activityChanger() {
    client.user.setPresence({ activity: { name: `${activityMessages.random()} | i.help`, type: "PLAYING" }, status: "dnd" });
    setTimeout(activityChanger, 900000);
  })();
};
