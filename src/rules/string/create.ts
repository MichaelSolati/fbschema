import {JSONSchema4} from 'json-schema';
import {createEnum} from '../enum';
import {RulesReturn} from '../';

export const createString = (
  key: string,
  required: boolean,
  details: JSONSchema4
): RulesReturn => {
  const property = `data.${key}`;
  let rules = [`${property} is string`];
  let functions: string[] = [];

  if (details.maxLength) {
    rules.push(`${property}.size() <= ${details.maxLength}`);
  }

  if (details.minLength) {
    rules.push(`${property}.size() >= ${details.minLength}`);
  }

  if (details.enum) {
    const createdEnum = createEnum(key, property, details.enum);
    functions = [...functions, ...createdEnum.functions];
    rules = [...rules, ...createdEnum.rules];
  }

  if (!required) {
    const functionName = `CREATE_${key.toUpperCase()}`;
    functions.push(`
    function ${functionName}(data) {
      return !data.keys().hasAll(['${key}']) || ${rules.join(' && ')};
    }`);
    rules = [`${functionName}(data)`];
  }

  return {
    functions,
    rules,
  };
};
