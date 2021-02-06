import {JSONSchema4} from 'json-schema';
import {RulesReturn} from '../';
import {createString} from '../string/create';

export const createObject = (
  json: JSONSchema4,
  createFunctionName: string
): RulesReturn => {
  let functions: string[] = [];
  let rules: string[] = [];

  for (const name in json.properties) {
    let createdString;
    const property = json.properties[name];
    switch (property.type) {
      case 'string':
        createdString = createString(name, property);
        functions = [...functions, ...createdString.functions];
        rules = [...rules, ...createdString.rules];
        break;

      default:
        break;
    }
  }
  functions.push(`
  function ${createFunctionName}(data) {
    return ${rules.join(' && ') + ';'}
  }`);

  return {
    functions,
    rules: [],
  };
};
