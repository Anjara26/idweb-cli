const chalk = require("chalk");

// usage represents the help guide
const usage = function () {
  const usageText = `
 Welcome to idweb-cli.
  
 usage:

    $ ${primaryLog("idweb -g <options> -n [entity]")}
  
 commands can be:
  
    ${primaryLog("-g")} :      used to generate ${primaryLog("<options>")}

 options can be:
    ${primaryLog("c")} :       used to generete ${primaryLog("controller")}
    ${primaryLog("d")} :       used to generete ${primaryLog(
    "dtos (Data Transfer Objects)"
  )}
    ${primaryLog("i")} :       used to generete ${primaryLog("interface")}
    ${primaryLog("r")} :       used to generete ${primaryLog("route")}
    ${primaryLog("s")} :       used to generete ${primaryLog("service")}
    ${primaryLog("")}  :       used to generete ${primaryLog(
    "API [interface, dtos, service, controller, route]"
  )}
`;

  console.log(usageText);
};

const primaryLog = function (text) {
  return chalk.blue(text);
};

module.exports = {
  usage,
};
