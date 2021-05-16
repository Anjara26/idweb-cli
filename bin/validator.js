const files = require("./files");

const checkFolder = (folderPath) => {
  if (!files.directoryExists(folderPath)) {
    console.log(chalk.red(`${folderPath} folder not found`));
    process.exit();
  }
};
