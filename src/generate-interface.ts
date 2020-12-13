import * as decomment from 'decomment';
import * as fs from 'fs';
import {JSONSchema4} from 'json-schema';
import {compile} from 'json-schema-to-typescript';
import * as path from 'path';
import * as prettier from 'prettier';

const libName = require('../package.json').name;

export default async (
  json: JSONSchema4,
  fileName: string,
  workingDirectory: string
): Promise<void> => {
  const generatedInterface = await compile(json, json.title || fileName);
  const globalInterface = `
  /**
   * This file was automatically generated DO NOT MODIFY IT BY HAND.
   * Instead modify ${libName}/${fileName}.json and run \`${libName}\`
   * to regenerate this file and generate new Firestore rules.
   */
  declare global {
    ${decomment(generatedInterface)}
  }
  export {};
`;

  const prettyInterface = prettier.format(globalInterface, {
    parser: 'typescript',
    ...require('gts/.prettierrc.json'),
  });

  fs.writeFileSync(
    path.join(workingDirectory, 'types', libName, `${fileName}.d.ts`),
    prettyInterface
  );
};
