import {JSONSchema4} from 'json-schema';
import {RulesReturn} from '../';
import {createString} from '../string/create';

export const createObject = (
  json: JSONSchema4,
  createFunctionName: string
): RulesReturn => {
  let functions: string[] = [];
  let rules: string[] = [];
  const required = Array.isArray(json.required) ? json.required : [];

  if (Object.keys(json.properties || {}).length > 0) {
    // Create rules for each property of JSON Schema
    for (const name in json.properties) {
      let createdString;
      const property = json.properties[name];
      switch (property.type) {
        case 'string':
          createdString = createString(name, required.includes(name), property);
          functions = [...functions, ...createdString.functions];
          rules = [...rules, ...createdString.rules];
          break;

        default:
          break;
      }
    }

    // Create rule if no additional properties allowed
    if (json.additionalProperties === false) {
      const hasOnly = Object.keys(json.properties || {})
        .map(key => `'${key}'`)
        .join(', ');
      rules.push(`data.keys().hasOnly([${hasOnly}])`);
    }

    // Create rule if there are required properties
    if (required.length > 0) {
      const hasAll = required.map(key => `'${key}'`).join(', ');
      rules.push(`data.keys().hasAll([${hasAll}])`);
    }

    functions.push(`
    function ${createFunctionName}(data) {
      return ${rules.join(' && ') + ';'}
    }`);
  }

  return {
    functions,
    rules: [],
  };
};
