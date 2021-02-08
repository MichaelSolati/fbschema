import {JSONSchema7} from 'json-schema';
import {RulesReturn} from '../../';
import {createEnum} from '../../enum';
import {createNumbersRules} from '../create';

export const createNumber = (
  key: string,
  required: boolean,
  details: JSONSchema7
): RulesReturn => {
  const property = `data.${key}`;
  let rules = [
    `${property} is number`,
    ...createNumbersRules(property, details),
  ];
  let functions: string[] = [];

  // Rule for enum integer
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
