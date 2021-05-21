const chalk = require("chalk");

class Logger {
  constructor() {
    this.erros = [];
    this.success = [];
  }

  setErrors(message) {
    this.erros.push(message);
  }

  setSuccess(message) {
    this.success.push(message);
  }

  show() {
    const successCount = this.success.length;
    const errosCount = this.erros.length;
    if (successCount > 0) {
      console.log("success: ");
      this.success.forEach((message) =>
        console.log(chalk.green("- " + message))
      );
      console.log("\n");
    }
    if (errosCount > 0) {
      console.log("errors: ");
      this.erros.forEach((message) => console.log(chalk.red("- " + message)));
      console.log("\n");
    }
    console.log(
      chalk.green(`success(${successCount})`),
      chalk.red(`errors(${errosCount})`)
    );
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Logger();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
