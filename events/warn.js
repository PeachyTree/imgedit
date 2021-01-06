// Copyright (©) 2020-2021 Shin#0484. All rights reserved. MIT License.

module.exports = async (client, e) => {
  client.logger.log("warn", `A warn event was sent by Discord.js: \n${e}`);
};
