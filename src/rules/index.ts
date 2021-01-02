import {JSONSchema4} from 'json-schema';
import * as prettier from 'prettier';

import {createObject} from './object';

export const generateRules = (
  json: JSONSchema4,
  collectionName: string
): string => {
  const createFunctionName = `create${collectionName.toUpperCase()}`;
  const createRules = createObject(json, createFunctionName);

  return `
match /${collectionName}/{key} {
  ${createRules}

  allow read: if false;
  allow create: if ${createFunctionName}(request.resource.data);
  allow update: if false;
  allow delete: if false;
  }`;
};

export const wrapRules = (rules: string[]): string => {
  const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    allow read, write: if false;
    ${rules.join('\n')}
  }
}`;

  const prettyFirestoreRules = prettier
    .format(firestoreRules, {
      // @ts-ignore
      emptyLinesBetweenBlocks: 1,
      parser: 'firestore',
    })
    .replace(/.&&/gm, ' &&');

  return prettyFirestoreRules;
};
