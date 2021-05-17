const { existsSync, readdir, readdirSync } = require("fs");
const path = require("path");
const _ = require("lodash");
const ts = require("typescript");

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

const testClass = () => {
  let files = readdirSync("./src/entity").filter((item) =>
    _.includes(item, ".entity.ts")
  );

  let mods = new Map();
  files.forEach((file) => {
    let ex = [];
    // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#using-the-type-checker
    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram([`./src/entity/${file}`], {
      module: ts.ModuleKind.ES2015,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES5,
    });
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();
    // Visit every sourceFile in the program
    program
      .getSourceFiles()
      .filter((sourceFile) => _.includes(sourceFile.fileName, file))
      .forEach((sourceFile) => {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, (node) => {
          if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            // This is a top level class, get its symbol
            let symbol = checker.getSymbolAtLocation(node.name);
            ex.push(symbol.getName());
          }
        });
      });
    mods.set(file, ex);
  });

  mods.forEach((value, key) => {
    console.log(key); // my-a.service.ts
    console.dir(value); // [ 'MyAService' ]
  });
};

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  directoryFileList,
  getEntityNames,
  testClass,
};
