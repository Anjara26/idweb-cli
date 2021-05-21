const { existsSync, readdirSync, writeFile } = require("fs");
const path = require("path");

const compiler = require("./compiler");
const Logger = require("./logger");
const logger = new Logger().getInstance();

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return existsSync(filePath);
};

const createFile = (path, content) => {
  writeFile(path, content, function (err) {
    if (err) logger.setErrors(err.message);
  });
};

const directoryFileList = (
  path,
  fileKey,
  fileNames = [],
  ignoreFileNames = []
) => {
  ignoreFileNames.push("abstract.entity.ts");
  let files = readdirSync(path);
  checkFileEntitys(files, fileNames);
  return files.filter((item) =>
    fileNames.length === 0
      ? item.includes(fileKey) && !ignoreFileNames.includes(item)
      : item.includes(fileKey) && validName(item, fileNames)
  );
};

const checkFileEntitys = function (files, fileNames) {
  fileNames.forEach((fileName) => {
    if (
      files.indexOf(`${fileName}.entity.ts`) === -1 &&
      files.indexOf(`${fileName}s.entity.ts`) === -1
    )
      logger.setErrors(`src/entity/${fileName}.entity.ts doesn't exist`);
  });
};

const validName = function (input, fileNames = []) {
  return fileNames.some((fileName) =>
    input.toLowerCase().includes(fileName.toLowerCase())
  );
};

const generateTemplate = async (types = [], entityNames = []) => {
  if (types.length === 0)
    types = ["service", "route", "controller", "interface", "dto"];

  const classes = compiler.getAllClasses(
    directoryFileList("./src/entity/", ".entity.ts", entityNames)
  );

  types.forEach((type) => {
    const template = require(`./templates/${type}.template`);
    classes.forEach((classObject) => {
      const filePath = `src/${type}s/${classObject.file}.${type}.ts`;
      if (existsSync(filePath)) {
        logger.setErrors(
          `src/${type}s/${classObject.file}.${type}.ts already exist`
        );
      } else {
        createFile(filePath, template.codeTemplate(classObject));
        logger.setSuccess(`${filePath} created`);
      }
    });
  });
};

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  directoryFileList,
  generateTemplate,
};
