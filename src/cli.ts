#!/usr/bin/env node
import fbschema from './index';

const [, , filepath] = process.argv;

fbschema(filepath).catch(e => console.error(e));
