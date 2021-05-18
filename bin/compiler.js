const _ = require("lodash");
const ts = require("typescript");
const fs = require("fs");

// Build a program using the set of root file names in fileNames
const createProgram = (filePath) => {
  //use ES205 but can upgrade to recent version
  let program = ts.createProgram([filePath], {
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES5,
  });

  return program;
};

const serializeAttribute = (members, checker) => {
  let attributes = [];

  members.forEach((member) => {
    attributes.push({
      name: member.getName(),
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(member, member.valueDeclaration)
      ),
    });
    //get type if type is created by the developper member.getDeclarations()[0].getText();
  });

  return attributes;
};

const generateEntitysJSON = () => {
  let listClass = [];

  let files = fs
    .readdirSync("./src/entity")
    .filter((item) => _.includes(item, ".entity.ts"));

  files.forEach((file) => {
    let program = createProgram(`./src/entity/${file}`);
    let checker = program.getTypeChecker();
    program
      .getSourceFiles()
      .filter((sourceFile) => _.includes(sourceFile.fileName, file))
      .forEach((sourceFile) => {
        ts.forEachChild(sourceFile, (node) => {
          if (ts.isClassDeclaration(node) && node.name) {
            let symbol = checker.getSymbolAtLocation(node.name);
            listClass.push({
              file: file,
              className: symbol.getName(),
              attributes: serializeAttribute(symbol.members, checker),
            });
          }
        });
      });
  });

  return listClass;
};

module.exports = {
  generateEntitysJSON,
};
