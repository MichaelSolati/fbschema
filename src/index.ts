import * as fsExtra from 'fs-extra';
import * as glob from 'glob';
import {JSONSchema4} from 'json-schema';
import * as path from 'path';

import generateInterface from './generate-interface';

const libName = require('../package.json').name;

export default async (filepath = process.cwd()): Promise<void> => {
  const workingDirectory = path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);

  const schemasGlob = path.join(workingDirectory, libName, '**', '*.json');
  glob(schemasGlob, {}, async (_, files) => {
    const interfaceDirectory = path.join(workingDirectory, 'types', libName);
    fsExtra.emptyDirSync(interfaceDirectory);

    for (const file of files) {
      const fileName = path.basename(file).split('.').shift() as string;
      const json: JSONSchema4 = require(file);
      await generateInterface(json, fileName, workingDirectory);
    }
  });
};
