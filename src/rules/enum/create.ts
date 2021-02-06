import {JSONSchema4Type} from 'json-schema';
import {RulesReturn} from '../';

export const createEnum = (
  key: string,
  property: string,
  enumArray: JSONSchema4Type[]
): RulesReturn => {
  const functionRules: string[] = [];
  const functionName = `CREATE_ENUM_${key.toUpperCase()}`;

  for (const element of enumArray) {
    switch (typeof element) {
      case 'string':
        functionRules.push(`${property} == '${element}'`);
        break;
      case 'number':
        functionRules.push(`${property} == ${element}`);
        break;
      case 'boolean':
        functionRules.push(`${property} == ${element}`);
        break;
      default:
        break;
    }
  }
  return {
    functions: [
      `
    function ${functionName}(data) {
      return ${functionRules.join(' || ')};
    }`,
    ],
    rules: [`${functionName}(data)`],
  };
};
