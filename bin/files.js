const { existsSync, readdir } = require("fs");
const path = require("path");

const regex = require("./config/regex");

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return existsSync(filePath);
};

const directoryFileList = (path) => {
  return new Promise((resolve, reject) => {
    readdir(path, async (err, files) => {
      if (err) reject(err.message);
      resolve(files);
    });
  });
};

const getEntityNames = (ignore = []) => {
  return new Promise(async (resolve, reject) => {
    let entityNames = [];
    await directoryFileList("./src/entity")
      .then((files) => {
        files.forEach((file) => {
          const match = file.match(regex.R_ENTITY_NAME);
          if (match) if (!ignore.includes(match[1])) entityNames.push(match[1]);
        });
      })
      .catch((err) => {
        reject(err);
      });
    resolve(entityNames);
  });
};

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  directoryFileList,
  getEntityNames,
};
