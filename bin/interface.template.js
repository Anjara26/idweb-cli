const directoryPath = "./src/interfaces";

const codeTemplate = (classObject) => {
  const attributeCode = stringifyAtrribute(classObject.attributes.list);
  const importsCode = stringifyImport(
    classObject.attributes.imports,
    classObject.file
  );
  return `${importsCode}export interface ${classObject.className} {${attributeCode}}`;
};

const stringifyAtrribute = (attributes) => {
  let code = "\n";

  if (attributes.length > 0) {
    attributes.forEach((attribute) => {
      code = `${code}   ${attribute.name}: ${attribute.type};\n`;
    });
  }

  return code;
};

const stringifyImport = (imports, fileName) => {
  let code = "";
  if (imports.length > 0) {
    imports.forEach((importItem) => {
      code = `${code}import { ${importItem} } from '@interfaces/${fileName}.interface';\n`;
    });
  }
  return code;
};

module.exports = {
  codeTemplate,
  directoryPath,
};
