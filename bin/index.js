#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const files = require("./files");

//clear screen
clear();

//display banner
console.log(
  chalk.yellow(figlet.textSync("Id?Web", { horizontalLayout: "full" }))
);

// check the current folder have entity folder
if (!files.directoryExists("./src/entity")) {
  console.log(
    chalk.red("No entity folder. Check that you are in a id?web's template")
  );
  process.exit();
}

files.getEntityNames(["abstract"]).then((res) => {
  console.log(res);
});
