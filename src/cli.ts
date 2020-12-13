#!/usr/bin/env node
import fbschema from './index';

const [, , filepath] = process.argv;

fbschema(filepath);
