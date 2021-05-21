const directoryPath = "./src/routes";

const codeTemplate = (classObject) => {
  return `import { Router } from 'express';
import ${classObject.className}Controller from '@controllers/${classObject.file}.controller';
import { Create${classObject.className}Dto } from '@dtos/${classObject.file}.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
    
class ${classObject.className}Route implements Route {
    public path = '/${classObject.file}s';
    public router = Router();
    public ${classObject.file}Controller = new ${classObject.className}Controller();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(\`\${this.path}\`, this.${classObject.file}Controller.get${classObject.className}s);
        this.router.get(\`\${this.path}/:id(\\d+)\`, this.${classObject.file}Controller.get${classObject.className}ById);
        this.router.post(\`\${this.path}\`, validationMiddleware(Create${classObject.className}Dto, 'body'), this.${classObject.file}Controller.create${classObject.className});
        this.router.put(\`\${this.path}/:id(\\d+)\`, validationMiddleware(Create${classObject.className}Dto, 'body', true), this.${classObject.file}Controller.update${classObject.className});
        this.router.delete(\`\${this.path}/:id(\\d+)\`, this.${classObject.file}Controller.delete${classObject.className});
    }
}
    
export default ${classObject.className}Route;`;
};

module.exports = {
  codeTemplate,
  directoryPath,
};
