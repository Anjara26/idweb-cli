const directoryPath = "./src/services";

const codeTemplate = (classObject) => {
  return `import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { Create${classObject.className}Dto } from '@dtos/${classObject.file}.dto';
import { ${classObject.className}Entity } from '@entity/${classObject.file}.entity';
import HttpException from '@exceptions/HttpException';
import { ${classObject.className} } from '@interfaces/${classObject.file}.interface';
import { isEmpty } from '@utils/util';
   
class ${classObject.className}Service {
    public ${classObject.file} = ${classObject.className}Entity;
   
    public async findAll${classObject.className}(): Promise<${classObject.className}[]> {
       const ${classObject.file}Repository = getRepository(this.${classObject.file});
       const ${classObject.file}: ${classObject.className}[] = await ${classObject.file}Repository.find();
       return ${classObject.file};
    }
   
    public async find${classObject.className}ById(${classObject.file}Id: number): Promise<${classObject.className}> {
       if (isEmpty(${classObject.file}Id)) throw new HttpException(400, "You're not ${classObject.file}Id");
   
       const ${classObject.file}Repository = getRepository(this.${classObject.file});
       const find${classObject.className}: ${classObject.className} = await ${classObject.file}Repository.findOne({ where: { id: ${classObject.file}Id } });
       if (!find${classObject.className}) throw new HttpException(409, "You're not ${classObject.file}");
   
       return find${classObject.className};
    }
   
    public async create${classObject.className}(${classObject.file}Data: Create${classObject.className}Dto): Promise<${classObject.className}> {
       if (isEmpty(${classObject.file}Data)) throw new HttpException(400, "You're not ${classObject.file}Data");
   
       const ${classObject.file}Repository = getRepository(this.${classObject.file});

       const create${classObject.className}Data: ${classObject.className} = await ${classObject.file}Repository.save({ ...${classObject.file}Data });
   
       return create${classObject.className}Data;
    }
   
    public async update${classObject.className}(${classObject.file}Id: number, ${classObject.file}Data: Create${classObject.className}Dto): Promise<${classObject.className}> {
       if (isEmpty(${classObject.file}Data)) throw new HttpException(400, "You're not ${classObject.file}Data");
   
       const ${classObject.file}Repository = getRepository(this.${classObject.file});
       const find${classObject.className}: ${classObject.className} = await ${classObject.file}Repository.findOne({ where: { id: ${classObject.file}Id } });
       if (!find${classObject.className}) throw new HttpException(409, "You're not ${classObject.file}");

       await ${classObject.file}Repository.update(${classObject.file}Id, { ...${classObject.file}Data });
   
       const update${classObject.className}: ${classObject.className} = await ${classObject.file}Repository.findOne({ where: { id: ${classObject.file}Id } });
       return update${classObject.className};
    }
   
    public async delete${classObject.className}(${classObject.file}Id: number): Promise<${classObject.className}> {
       if (isEmpty(${classObject.file}Id)) throw new HttpException(400, "You're not ${classObject.file}Id");
   
       const ${classObject.file}Repository = getRepository(this.${classObject.file});
       const find${classObject.className}: ${classObject.className} = await ${classObject.file}Repository.findOne({ where: { id: ${classObject.file}Id } });
       if (!find${classObject.className}) throw new HttpException(409, "You're not ${classObject.file}");
   
       await ${classObject.file}Repository.delete({ id: ${classObject.file}Id });
       return find${classObject.className};
    }
}
   
export default ${classObject.className}Service;
`;
};

module.exports = {
  codeTemplate,
  directoryPath,
};
