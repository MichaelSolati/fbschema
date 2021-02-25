import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as glob from 'glob';
import {JSONSchema4} from 'json-schema';
import * as path from 'path';

import {FBSchema} from './fbschema';
import {generateInterface} from './interfaces';
import {generateRules, wrapRules} from './rules';
import {getWorkingDirectory, stripString} from './utils';

const libName = require('../package.json').name;

export {FBSchema} from './fbschema';
export const generate = async (filepath = process.cwd()): Promise<void> => {
  const collectionRules: string[] = [];
  const workingDirectory = getWorkingDirectory(filepath);
  const schemasGlob = path.join(workingDirectory, libName, '**', '*.json');
  const interfaceDirectory = path.join(workingDirectory, 'types', libName);
  fsExtra.emptyDirSync(interfaceDirectory);

  glob(schemasGlob, {}, async (_, files) => {
    for (const file of files) {
      const json: FBSchema = require(file);
      const fileName = path.basename(file).split('.').shift() as string;
      const collectionName = stripString(json.title || fileName);

      await generateInterface(
        json as JSONSchema4,
        collectionName,
        fileName,
        interfaceDirectory
      );

      collectionRules.push(generateRules(json, collectionName));
    }

    fs.writeFileSync(
      path.join(workingDirectory, 'firestore.rules'),
      wrapRules(collectionRules)
    );
  });
};

export default generate;
