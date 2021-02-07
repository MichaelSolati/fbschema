import {JSONSchema4} from 'json-schema';
import {createObject} from './object';

export type RulesReturn = {
  rules: string[];
  functions: string[];
};

export const generateRules = (
  json: JSONSchema4,
  collectionName: string
): string => {
  const createFunctionName = `CREATE_${collectionName.toUpperCase()}`;
  const createRules = createObject(json, createFunctionName).functions;

  return `
  match /${collectionName}/{key} {
  ${createRules.join('\n')}

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

  return firestoreRules;
};
