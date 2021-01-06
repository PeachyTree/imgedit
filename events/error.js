// Copyright (©) 2020-2021 Shin#0484. All rights reserved. MIT License.

module.exports = async (client, error) => {
  client.logger.log("error", `An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
};
