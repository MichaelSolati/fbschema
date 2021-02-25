import {JSONSchema7} from 'json-schema';

export type FBSchemaOperations =
  | 'read'
  | 'get'
  | 'list'
  | 'write'
  | 'create'
  | 'update'
  | 'delete';

export type FBSchemaOperationsObject = {
  [key in FBSchemaOperations]?: string;
};

export interface FBSchema extends JSONSchema7 {
  fbschema?: FBSchemaOperationsObject;
}
