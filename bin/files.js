const { existsSync, readdirSync, writeFile } = require("fs");
const path = require("path");

const compiler = require("./compiler");
const regex = require("./config/regex");

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return existsSync(filePath);
};

const createFile = (path, content) => {
  writeFile(path, content, function (err) {
    if (err) console.log(err);
  });
};

const directoryFileList = (path, fileKey, ignoreFileName = []) => {
  ignoreFileName.push("abstract.entity.ts");
  return readdirSync(path).filter(
    (item) => item.includes(fileKey) && !ignoreFileName.includes(item)
  );
};

// const getEntityNames = (ignore = []) => {
//   return new Promise(async (resolve, reject) => {
//     let entityNames = [];
//     await directoryFileList("./src/entity")
//       .then((files) => {
//         files.forEach((file) => {
//           const match = file.match(regex.R_ENTITY_NAME);
//           if (match) if (!ignore.includes(match[1])) entityNames.push(match);
//         });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//     resolve(entityNames);
//   });
// };

const generateTemplate = async (types = []) => {
  if (types.length === 0)
    types = ["service", "route", "controller", "interface"];

  const classes = compiler.getAllClasses(
    directoryFileList("./src/entity/", ".entity.ts")
  );

  types.forEach((type) => {
    const template = require(`./${type}.template`);
    classes.forEach((classObject) => {
      // createFile(
      //   `src/${type}s/${classObject.file}.${type}.ts`,
      //   template.codeTemplate(classObject)
      // );
    });
  });
};

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  directoryFileList,
  generateTemplate,
};
