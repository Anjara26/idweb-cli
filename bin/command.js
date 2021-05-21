const chalk = require("chalk");
const { command } = require("yargs");

const files = require("./files");
const Logger = require("./logger");
const logger = new Logger().getInstance();

const types = ["service", "route", "controller", "interface", "dto"];

const commandInterpreter = (command) => {
  switch (command[2]) {
    case "help":
      usage();
      break;
    case "g":
      generate(command);
      break;
    default:
      console.log(errorLog("invalid command passed"));
      usage();
  }
};

const generate = function (command) {
  // check the current folder have entity folder
  if (!files.directoryExists("./src/entity")) {
    console.log(chalk.red("Check that you are in a id?web's template"));
    process.exit();
  }

  const options = getOptions(command);
  checkOptions(options);

  files.generateTemplate(options, getEntitys(command)).then(() => {
    logger.show();
  });
};

const checkOptions = (options) => {
  options.forEach((option) => {
    if (types.indexOf(option) === -1) {
      console.log(chalk.red(`unkown option ${option}\n`));
      console.log(optionsDoc);
      process.exit();
    }
  });
};

const getOptions = (command) => {
  let options = [];

  for (let i = 3; i < 8; i++) {
    if (command[i] && command[i] !== "-n") options.push(command[i]);
    else break;
  }

  return options;
};

const getEntitys = (command) => {
  let entitys = [];

  const indexfOfN = command.indexOf("-n");

  if (indexfOfN !== -1) {
    entitys = command.slice(indexfOfN + 1, command.length);
  }

  return entitys;
};

// usage represents the help guide
const usage = function () {
  const usageText = `
Welcome to idweb-cli.
  
usage:

  $ ${primaryLog("idweb <commands> [options] -n [entity]")}

commands can be:
  
  ${primaryLog("g")}          :       used to generate ${primaryLog(
    "<options>"
  )}
  ${primaryLog("help")}       :       documentation
  ${optionsDoc}

*entity (optional) : the string before ".entity.ts"
`;

  console.log(usageText);
};

const primaryLog = function (text) {
  return chalk.blue(text);
};

const optionsDoc = `
options can be:

  ${primaryLog("controller")} :       used to generete ${primaryLog(
  "controller"
)}
  ${primaryLog("dto")}        :       used to generete ${primaryLog(
  "dto (Data Transfer Object)"
)}
  ${primaryLog("interface")}  :       used to generete ${primaryLog(
  "interface"
)}
  ${primaryLog("route")}      :       used to generete ${primaryLog("route")}
  ${primaryLog("service")}    :       used to generete ${primaryLog("service")}
  ${primaryLog("")}           :       used to generete ${primaryLog(
  "API [interface, dto, service, controller, route]"
)}
`;

const errorLog = function (error) {
  return chalk.red(error);
};

module.exports = { commandInterpreter };
