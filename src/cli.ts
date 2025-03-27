#!/usr/bin/env node
import fbschema from './index';

const [, , filepath] = process.argv;

console.log('🔍 FBSchema CLI starting...');
fbschema(filepath, {emitLogs: true}).catch(error => {
  console.error('❌ FBSchema CLI error:', error);
  throw error;
});
