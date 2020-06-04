exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const guildConf = client.settings.get(message.guild.id) || client.defaults;
  message.reply(`Imgedit Commands:\n9gag, bandicam, blur, blurple, brazzers, circle, deepfry, deviantart, disabled, explode, flip, flop, funky, haah, help, hooh, hypercam, ifunny, implode, invert, jpeg, magik, mc, memecenter, prefix, qrcreate, scott, sharpen, shutterstock, sonic, swirl, tile, trump, waaw, wall, wdt, wikihow, woow, wth`);
};

exports.aliases = [];
