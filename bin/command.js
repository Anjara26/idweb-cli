const chalk = require("chalk");

// usage represents the help guide
const usage = function () {
  const usageText = `
 Welcome to idweb-cli.
  
 usage:

    $ ${primaryLog("idweb <commands> <options> -n [entity]")}
  
 commands can be:
  
    ${primaryLog("-g, --generate")} :      used to generate ${primaryLog(
    "<options>"
  )}

 options can be:
    ${primaryLog("controller")} :       used to generete ${primaryLog(
    "controller"
  )}
    ${primaryLog("dtos")} :       used to generete ${primaryLog(
    "dtos (Data Transfer Objects)"
  )}
    ${primaryLog("interface")} :       used to generete ${primaryLog(
    "interface"
  )}
    ${primaryLog("route")} :       used to generete ${primaryLog("route")}
    ${primaryLog("service")} :       used to generete ${primaryLog("service")}
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
