const directoryPath = "./src/controllers";

const codeTemplate = (classObject) => {
  return `import { NextFunction, Request, Response } from 'express';
import { Create${classObject.className}Dto } from '@dtos/${classObject.file}.dto';
import { ${classObject.className} } from '@interfaces/${classObject.file}.interface';
import ${classObject.file}Service from '@services/${classObject.file}.service';

class ${classObject.className}Controller {
  public ${classObject.file}Service = new ${classObject.file}Service();

  public get${classObject.className}s = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAll${classObject.className}sData: ${classObject.className}[] = await this.${classObject.file}Service.findAll${classObject.className}();

      res.status(200).json({ data: findAll${classObject.className}sData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public get${classObject.className}ById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ${classObject.file}Id = Number(req.params.id);
      const findOne${classObject.className}Data: ${classObject.className} = await this.${classObject.file}Service.find${classObject.className}ById(${classObject.file}Id);

      res.status(200).json({ data: findOne${classObject.className}Data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create${classObject.className} = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ${classObject.file}Data: Create${classObject.className}Dto = req.body;
      const create${classObject.className}Data: ${classObject.className} = await this.${classObject.file}Service.create${classObject.className}(${classObject.file}Data);

      res.status(201).json({ data: create${classObject.className}Data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update${classObject.className} = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ${classObject.file}Id = Number(req.params.id);
      const ${classObject.file}Data: Create${classObject.className}Dto = req.body;
      const update${classObject.className}Data: ${classObject.className} = await this.${classObject.file}Service.update${classObject.className}(${classObject.file}Id, ${classObject.file}Data);

      res.status(200).json({ data: update${classObject.className}Data, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete${classObject.className} = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ${classObject.file}Id = Number(req.params.id);
      const delete${classObject.className}Data: ${classObject.className} = await this.${classObject.file}Service.delete${classObject.className}(${classObject.file}Id);

      res.status(200).json({ data: delete${classObject.className}Data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ${classObject.className}Controller;
`;
};

module.exports = {
  codeTemplate,
  directoryPath,
};
