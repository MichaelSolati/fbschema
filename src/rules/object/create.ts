import {JSONSchema4} from 'json-schema';

import {createString} from '../string/create';

export const createObject = (
  json: JSONSchema4,
  createFunctionName: string
): string => {
  const propertyValidations = [];
  for (const name in json.properties) {
    const property = json.properties[name];
    switch (property.type) {
      case 'string':
        propertyValidations.push(createString(name, property));
        break;

      default:
        break;
    }
  }

  return `function ${createFunctionName}(data) {
  return ${propertyValidations.join(' &&\n') + ';'}
}`;
};
