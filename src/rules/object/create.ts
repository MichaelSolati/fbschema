import {FBSchema} from '../../fbschema';
import {RulesReturn} from '../';
import {createString} from '../string';
import {createInteger, createNumber} from '../numbers';
import {isBoolean} from '../../utils';

export const createObject = (
  json: FBSchema,
  createFunctionName: string
): RulesReturn => {
  let functions: string[] = [];
  let rules: string[] = [];
  const required = Array.isArray(json.required) ? json.required : [];

  if (Object.keys(json.properties || {}).length > 0) {
    // Create rules for each property of JSON Schema
    for (const name in json.properties) {
      // Propert can be `boolean` if it is, skip it.
      if (isBoolean(json.properties[name])) {
        continue;
      }
      const property = json.properties[name] as FBSchema;
      let tempRules;

      switch (property.type) {
        case 'string':
          tempRules = createString(name, required.includes(name), property);
          break;
        case 'integer':
          tempRules = createInteger(name, required.includes(name), property);
          break;
        case 'number':
          tempRules = createNumber(name, required.includes(name), property);
          break;
        default:
          break;
      }
      if (tempRules) {
        functions = [...functions, ...tempRules.functions];
        rules = [...rules, ...tempRules.rules];
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

    // Disable if no rules generated
    if (rules.length === 0) {
      rules.push('false');
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
