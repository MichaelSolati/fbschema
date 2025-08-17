import * as fs from 'fs/promises';
import {JSONSchema7} from 'json-schema';
import * as path from 'path';

import {FirestoreJSONSchema, GenerationOptions} from '../types';
import {generateCollectionName, log} from '../utils';

function convertTypeToFirestore(type: string): string {
  switch (type) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'integer':
      return 'int';
    case 'boolean':
      return 'bool';
    case 'array':
      return 'list';
    case 'object':
      return 'map';
    default:
      return 'any';
  }
}

function generatePropertyRule(
  name: string,
  prop: JSONSchema7,
  required: boolean,
  isCreate = false,
): string {
  const type = convertTypeToFirestore(prop.type as string);
  const rules: string[] = [];

  // Handle required fields
  if (required) {
    if (isCreate) {
      rules.push(`'${name}' in request.resource.data`);
      rules.push(`request.resource.data.${name} != null`);
    } else {
      rules.push(`'${name}' in request.resource.data`);
      rules.push(`request.resource.data.${name} != null`);
    }
  }

  // Type validation
  rules.push(`request.resource.data.${name} is ${type}`);

  // Handle enums for different types
  if (prop.enum) {
    const enumValues = prop.enum
      .map(v => {
        if (v === null) return 'null';
        if (typeof v === 'string') return `'${v}'`;
        return v.toString();
      })
      .join(', ');
    rules.push(`request.resource.data.${name} in [${enumValues}]`);
  }

  // Handle number validations
  if (prop.type === 'number' || prop.type === 'integer') {
    if (prop.minimum !== undefined) {
      rules.push(`request.resource.data.${name} >= ${prop.minimum}`);
    }
    if (prop.maximum !== undefined) {
      rules.push(`request.resource.data.${name} <= ${prop.maximum}`);
    }
    if (prop.exclusiveMinimum !== undefined) {
      rules.push(`request.resource.data.${name} > ${prop.exclusiveMinimum}`);
    }
    if (prop.exclusiveMaximum !== undefined) {
      rules.push(`request.resource.data.${name} < ${prop.exclusiveMaximum}`);
    }
    if (prop.multipleOf !== undefined) {
      rules.push(`request.resource.data.${name} % ${prop.multipleOf} == 0`);
    }
  }

  // Handle string validations
  if (prop.type === 'string') {
    if (prop.minLength !== undefined) {
      rules.push(`request.resource.data.${name}.size() >= ${prop.minLength}`);
    }
    if (prop.maxLength !== undefined) {
      rules.push(`request.resource.data.${name}.size() <= ${prop.maxLength}`);
    }
  }

  /**
   * @todo correct uri regex
   */
  // // Handle URI format
  // if (prop.format === 'uri') {
  //   rules.push(
  //     `request.resource.data.${name}.matches('^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+(\/.*)?$')`,
  //   );
  // }

  /**
   * @todo correct timestamp regex
   */
  // // Handle date-time format
  // if (prop.format === 'date-time') {
  //   rules.push(
  //     `request.resource.data.${name}.matches('^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$')`,
  //   );
  // }

  return required
    ? rules.join(' && ')
    : `(!('${name}' in request.resource.data) || (${rules.join(' && ')}))`;
}

function generateSchemaRules(schema: FirestoreJSONSchema): string {
  const collectionName = generateCollectionName(schema);
  const required = schema.required || [];
  const rules = schema.fbschema || {};
  const hasProperties = Object.keys(schema.properties || {}).length > 0;

  let rulesContent = `    match /${collectionName}/{docId} {
      // Read operation
      allow read: if ${rules.read || 'false'};
      // Get operation
      allow get: if ${rules.get || rules.read || 'false'};
      // List operation
      allow list: if ${rules.list || rules.read || 'false'};
      // Write operation
      allow write: if ${rules.write || 'false'};
      // Create operation
      allow create: if ${rules.create || rules.write || 'false'}${hasProperties ? ' &&' : ';'}\n`;

  if (hasProperties) {
    const propertyRules = Object.entries(schema.properties ?? []).map(
      ([name, prop]) =>
        `        ${generatePropertyRule(name, prop as JSONSchema7, required.includes(name), true)}`,
    );

    rulesContent += propertyRules.join(' &&\n') + ';\n';

    // Update operation
    rulesContent += `      // Update operation
      allow update: if ${rules.update || rules.write || 'false'} &&\n`;

    const updatePropertyRules = Object.entries(schema.properties ?? []).map(
      ([name, prop]) =>
        `        ${generatePropertyRule(name, prop as JSONSchema7, required.includes(name), false)}`,
    );

    rulesContent += updatePropertyRules.join(' &&\n') + ';\n';
  }

  // Delete operation
  rulesContent += `      // Delete operation
      allow delete: if ${rules.delete || rules.write || 'false'};
    }`;

  return rulesContent;
}

export const generateFirestoreRules = async (
  schemasFolder: string,
  workingDirectory: string,
  generationOptions: GenerationOptions = {logs: false},
): Promise<void> => {
  log(generationOptions, '📝 Starting Firestore rules generation...');
  const schemaFiles = (await fs.readdir(schemasFolder)).filter(file =>
    file.endsWith('.json'),
  );

  let rulesContent = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Base rules
    match /{document=**} {
      allow read, write: if false;
    }

`;

  for (const file of schemaFiles) {
    const schemaPath = path.join(schemasFolder, file);
    const schema: FirestoreJSONSchema = JSON.parse(
      await fs.readFile(schemaPath, 'utf-8'),
    );
    rulesContent += generateSchemaRules(schema) + '\n\n';
    log(
      generationOptions,
      `✅ Generated rules for ${file} as collection ${generateCollectionName(schema)}`,
    );
  }

  rulesContent += '  }\n}';

  await fs.writeFile(
    path.join(workingDirectory, 'firestore.rules'),
    rulesContent,
  );
  log(generationOptions, '✨ Firestore rules generation completed!');
};
