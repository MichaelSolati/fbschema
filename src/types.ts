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

export interface FirestoreJSONSchema extends JSONSchema7 {
  fbschema?: FBSchemaOperationsObject;
}

export type GenerationOptions = {
  path?: string;
  logs?: boolean;
  rules?: boolean;
  types?: boolean;
};

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

export type LogOptions = GenerationOptions & {
  level?: LogLevel;
};
