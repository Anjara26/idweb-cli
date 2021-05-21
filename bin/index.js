#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const command = require("./command");
const args = process.argv;

//clear screen
clear();

//display banner
//  ___       _   ___  __        __         _
// |_ _|   __| | |__ \ \ \      / /   ___  | |__
//  | |   / _` |   / /  \ \ /\ / /   / _ \ | '_ \
//  | |  | (_| |  |_|    \ V  V /   |  __/ | |_) |
// |___|  \__,_|  (_)     \_/\_/     \___| |_.__/
console.log(
  chalk.yellow(figlet.textSync("Id?Web", { horizontalLayout: "full" }))
);

command.commandInterpreter(args);
