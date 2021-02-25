import {FBSchema} from '../../fbschema';
import {isNumber} from '../../utils';

export const createNumbersRules = (
  property: string,
  details: FBSchema
): string[] => {
  const rules = [];

  // Rules for minimum number
  if (isNumber(details.exclusiveMinimum)) {
    rules.push(`${property} > ${details.exclusiveMinimum}`);
  } else if (isNumber(details.minimum)) {
    rules.push(`${property} >= ${details.minimum}`);
  }

  // Rules for maximum number
  if (isNumber(details.exclusiveMaximum)) {
    rules.push(`${property} < ${details.exclusiveMaximum}`);
  } else if (isNumber(details.maximum)) {
    rules.push(`${property} <= ${details.maximum}`);
  }

  // Rule for multiple of number
  if (isNumber(details.multipleOf)) {
    rules.push(`${property} % ${details.multipleOf} == 0`);
  }

  return rules;
};
