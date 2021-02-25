import {
  FBSchema,
  FBSchemaOperationsObject,
  FBSchemaOperations,
} from '../fbschema';
import {createObject} from './object';
import {isBoolean, isString} from '../utils';

export type RulesReturn = {
  rules: string[];
  functions: string[];
};

const OPERATIONS_LIST: FBSchemaOperations[] = [
  'read',
  'get',
  'list',
  'write',
  'create',
  'update',
  'delete',
];

const addToOperations = (
  rule: string | boolean,
  operation: FBSchemaOperations,
  operations: FBSchemaOperationsObject
): void => {
  if (operations[operation]) {
    operations[operation] += ` && ${String(rule)}`;
  } else {
    operations[operation] = String(rule);
  }
};

export const generateRules = (
  json: FBSchema,
  collectionName: string
): string => {
  const generatedCreateFunctionName = `CREATE_${collectionName.toUpperCase()}`;
  const generatedCreateRules = createObject(json, generatedCreateFunctionName)
    .functions;

  const rules: FBSchemaOperationsObject = {};

  if (json.fbschema) {
    OPERATIONS_LIST.forEach(operation => {
      // @ts-ignore
      const rule = json.fbschema[operation];
      if ((isBoolean(rule) || isString(rule)) && rule !== undefined) {
        addToOperations(rule, operation, rules);
      }
    });
  }

  if (generatedCreateRules.length > 0) {
    addToOperations(
      `${generatedCreateFunctionName}(request.resource.data)`,
      'create',
      rules
    );
  }

  const generatedRules = Object.keys(rules).map(
    operation =>
      `allow ${operation}: if ${rules[operation as FBSchemaOperations]};`
  );
  return `
  match /${collectionName}/{key} {
  ${generatedCreateRules.join('\n')}

    ${generatedRules.join('\n    ')}
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
