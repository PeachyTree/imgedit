// Copyright (©) 2020-2021 Shin#0484. All rights reserved. MIT License.

const request = require("request").defaults({ encoding: null });
const imageCheck = require("file-type");

module.exports = (client) => {
  client.loadCommand = (commandName) => {
    try {
      client.logger.log("info", `Loading Command: ${commandName}.`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(commandName, props);
      props.aliases.forEach(alias => {
        client.aliases.set(alias, commandName);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };

  String.prototype.toFullWidth = function() {
    return this.replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0); });
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require("util").promisify(setTimeout);

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(client.token, "<redacted>")
      .replace(client.config.mashapeKey, "<redacted>")
    return text;
  };

  client.regexEscape = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
  };

  client.getImage = async (message) => {
    const messageList = message.channel.messages.sort(function(a, b) {
      return b.createdTimestamp - a.createdTimestamp;
    }).array();
    for (const messageCheck of messageList) {
      if (messageCheck.attachments.array().length !== 0) {
        const result = await client.fileCheck(messageCheck.attachments.array()[0].url);
        if (result !== "Attachment not found") {
          return result;
        }
      } else if (messageCheck.embeds.length !== 0) {
        if (messageCheck.embeds[0].thumbnail) {
          const result = await client.fileCheck(messageCheck.embeds[0].thumbnail.url);
          if (result !== "Attachment not found") {
            return result;
          }
        } else if (messageCheck.embeds[0].image) {
          const result = await client.fileCheck(messageCheck.embeds[0].image.url);
          if (result !== "Attachment not found") {
            return result;
          }
        }
      }
    }
  };

  client.fileCheck = (image) => {
    return new Promise((resolve, reject) => {
      request.get(image, (error, response, body) => {
        if (error) throw new Error(error);
        const imageType = imageCheck(body);
        if (imageType && ["image/jpeg", "image/png", "image/webp"].includes(imageType.mime)) {
          resolve(image);
        } else {
          reject("Attachment not found");
        }
      });
    });
  };

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.log("error", `Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    client.logger.log("error", `Unhandled rejection: ${err}`);
  });
};
