import * as path from 'path';

import {generateInterfaces} from './interfaces';
import {GenerationOptions} from './types';
import {generateFirestoreRules} from './rules';
import {getWorkingDirectory, log} from './utils';

const jsonSchemaFolder = require('../package.json').name;

export {FirestoreJSONSchema} from './types';

export const generate = async (
  filepath = process.cwd(),
  options: GenerationOptions = {emitLogs: false},
): Promise<void> => {
  log(options, '🚀 Starting FBSchema generation...');
  log(options, `📂 Working directory: ${filepath}`);

  const workingDirectory = getWorkingDirectory(filepath);
  const schemasFolder = path.join(workingDirectory, jsonSchemaFolder);
  const interfaceDirectory = path.join(
    workingDirectory,
    'types',
    jsonSchemaFolder,
  );

  log(options, `📁 Schemas folder: ${schemasFolder}`);
  log(options, `📁 Interface output folder: ${interfaceDirectory}`);

  try {
    await generateInterfaces(schemasFolder, interfaceDirectory, options);
    log(options, '✅ FBSchema generated interfaces successfully!');
    await generateFirestoreRules(schemasFolder, workingDirectory, options);
    log(options, '✅ FBSchema generated Firestore rules successfully!');
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
