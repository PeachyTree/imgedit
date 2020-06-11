// Copyright (©) 2020 Azura Apple. All rights reserved. MIT License.

module.exports = async (client, message) => {

  if (message.author.bot) return;

  if (!message.guild) return;

  const guildConf = client.settings.ensure(message.guild.id, client.defaults);
  const prefix = prefixMention.test(message.content) ? message.content.match(prefixMention)[0] : guildConf.prefix;

  if (message.content.startsWith(prefix) === false) return;

  const escapedPrefix = client.regexEscape(prefix);
  const prefixRegex = new RegExp(`^(${escapedPrefix})`);
  const args = message.content.replace(prefixRegex, "").trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(`${command}.js`) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;
};
