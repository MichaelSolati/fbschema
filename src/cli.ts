#!/usr/bin/env node
import {Command, Option} from 'commander';
import fbschema from './index';
import {GenerationOptions} from './types';
import packageJson from '../package.json';

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description);

program
  .addOption(
    new Option('-p, --path <string>', 'filepath of project').default(
      process.cwd(),
      'the current working directory',
    ),
  )
  .addOption(
    new Option('-l, --logs <boolean>', 'output extra debugging')
      .default(true)
      .argParser(value => value.toLowerCase() !== 'false'),
  )
  .addOption(
    new Option('-r, --rules <boolean>', 'generate firestore rules')
      .default(true)
      .argParser(value => value.toLowerCase() !== 'false'),
  )
  .addOption(
    new Option('-t, --types <boolean>', 'generate typescript types')
      .default(true)
      .argParser(value => value.toLowerCase() !== 'false'),
  );

program.parse(process.argv);
const options = program.opts() as GenerationOptions;

fbschema(options).catch(error => {
  // The `generate` function logs the error if `logs` is enabled.
  // This ensures the error is always displayed, even with `--logs=false`.
  if (!options.logs) {
    console.error('❌ Error during FBSchema generation:', error);
  }
});
