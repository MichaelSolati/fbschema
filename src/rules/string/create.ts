import {JSONSchema4} from 'json-schema';

export const createString = (key: string, details: JSONSchema4): string => {
  const property = `data.${key}`;
  const validations = [`${property} is string`];

  if (details.maxLength) {
    validations.push(`${property}.size() <= ${details.maxLength}`);
  }

  if (details.minLength) {
    validations.push(`${property}.size() >= ${details.minLength}`);
  }

  return validations.join(' && ');
};
