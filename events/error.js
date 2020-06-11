// Copyright (©) 2020 Azura Apple. All rights reserved. MIT License.

module.exports = async (client, error) => {
  client.logger.log("error", `An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
};
