import * as path from 'path';

import {generateInterfaces} from './interfaces';
import {getWorkingDirectory} from './utils';

const jsonSchemaFolder = require('../package.json').name;

export {FBSchema} from './fbschema';
export const generate = async (filepath = process.cwd()): Promise<void> => {
  const workingDirectory = getWorkingDirectory(filepath);
  const schemasFolder = path.join(workingDirectory, jsonSchemaFolder);
  const interfaceDirectory = path.join(
    workingDirectory,
    'types',
    jsonSchemaFolder,
  );

  await generateInterfaces(schemasFolder, interfaceDirectory);
};

export default generate;
