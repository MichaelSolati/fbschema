#!/usr/bin/env node
import {Command} from 'commander';
import fbschema from './index';
import packageJson from '../package.json';

let filepath = process.cwd();

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description);

program
  .option('-l, --logs', 'output extra debugging')
  .option('-p, --path <string>', 'filepath of project');

program.parse(process.argv);
const options = program.opts();

if (options.path) {
  filepath = options.path;
}

console.log('🔍 FBSchema CLI starting...');
fbschema(filepath, {emitLogs: options.logs ?? true}).catch(error => {
  console.error('❌ FBSchema CLI error:', error);
  throw error;
});
