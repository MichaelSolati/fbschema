import * as path from 'path';

import {generateInterfaces} from './interfaces';
import {GenerationOptions} from './types';
import {generateFirestoreRules} from './rules';
import {getWorkingDirectory, log} from './utils';

const jsonSchemaFolder = require('../package.json').name;

export {FirestoreJSONSchema} from './types';

export const generate = async (
  options: GenerationOptions = {
    logs: false,
    rules: true,
    types: true,
  },
): Promise<void> => {
  log(options, '🚀 Starting FBSchema generation...');
  const workingDirectory = getWorkingDirectory(options.path);
  log(options, `📂 Working directory: ${workingDirectory}`);
  const schemasFolder = path.join(workingDirectory, jsonSchemaFolder);
  const interfaceDirectory = path.join(
    workingDirectory,
    'types',
    jsonSchemaFolder,
  );

  log(options, `📁 Schemas folder: ${schemasFolder}`);

  try {
    if (options.types) {
      log(options, `📁 Interface output folder: ${interfaceDirectory}`);
      await generateInterfaces(schemasFolder, interfaceDirectory, options);
      log(options, '✅ FBSchema generated interfaces successfully!');
    }
    if (options.rules) {
      log(options, `📁 Rules output folder: ${workingDirectory}`);
      await generateFirestoreRules(schemasFolder, workingDirectory, options);
      log(options, '✅ FBSchema generated Firestore rules successfully!');
    }
    log(options, '✅ FBSchema generation completed successfully!');
  } catch (error) {
    log(
      {...options, level: 'error'},
      '❌ Error during FBSchema generation:',
      error,
    );
    throw error;
  }
};

export default generate;
