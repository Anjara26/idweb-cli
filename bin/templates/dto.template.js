const directoryPath = "./src/dtos";

const codeTemplate = (classObject) => {
  return `export class Create${classObject.className} {}`;
};

module.exports = {
  codeTemplate,
  directoryPath,
};
