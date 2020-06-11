// Copyright (©) 2020 Azura Apple. All rights reserved. MIT License.

const { stripIntedient } = require('common-tags');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.send(stripIntedient`
    __**Bot Commands**__
    The default prefix is \`i.\`

    __Image Manipulation:__
    9gag, bandicam, blur, blurple, brazzers, circle, deepfry, deviantart, disabled, explode, flip, flop, funky, haah, hooh, hypercam, ifunny, implode, invert, jpeg, magik, mc, memecenter, qrcreate, scott, sharpen, shutterstock, sonic, swirl, tile, trump, waaw, wall, wdt, wikihow, woow, wth
    
    __Other:__
    help, prefix
    
  `);
};

exports.aliases = [];
