import * as fsExtra from 'fs-extra';
import {compileFromFile} from 'json-schema-to-typescript';
import * as path from 'path';

const libName = require('../../package.json').name;
const globalBannerComment = `/**
 * This file was automatically generated by ${libName}.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source in the schemas folder,
 * and run \`npx ${libName}\` to regenerate this file.
 */`;

const options = {
  bannerComment: globalBannerComment,
  additionalProperties: false,
  style: {
    printWidth: 120,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5' as const,
  },
  noExtraProps: true,
  sortProperties: true,
  strictNullChecks: true,
};

export const generateInterfaces = async (
  schemasFolder: string,
  typesFolder: string,
): Promise<void> => {
  const tsFileNames: string[] = [];

  await fsExtra.emptyDir(typesFolder);

  const schemaPaths = (await fsExtra.readdir(schemasFolder))
    .filter(file => path.extname(file) === '.json')
    .map(file => path.join(schemasFolder, file));

  for (const schemaPath of schemaPaths) {
    const schemaParsedPath = path.parse(schemaPath);
    const tsFileName = `${schemaParsedPath.name}.ts`;
    tsFileNames.push(tsFileName);
    const definitionPath = path.join(typesFolder, tsFileName);
    const definition = await compileFromFile(schemaPath, options);
    await fsExtra.writeFile(definitionPath, definition);
  }

  const exportFile = tsFileNames.map(s => `export * from './${s}';`);
  exportFile.unshift(globalBannerComment + '\n');
  exportFile.push('');

  await fsExtra.writeFile(
    path.join(typesFolder, 'index.ts'),
    exportFile.join('\n'),
  );
};
