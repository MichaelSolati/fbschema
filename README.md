# fbschema

[![npm](https://img.shields.io/npm/v/fbschema)](https://www.npmjs.com/package/fbschema)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/fbschema)](https://bundlephobia.com/result?p=fbschema)
[![Deploy CI](https://github.com/MichaelSolati/fbschema/workflows/Deploy%20CI/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Deploy+CI%22)
[![Lint and Test](https://github.com/MichaelSolati/fbschema/workflows/Lint%20and%20Test/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Lint+and+Test%22)
[![GitHub stars](https://img.shields.io/github/stars/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/network/members)

A simple library to generate TypeScript definition files as well as Firestore rules based on a [JSON Schema](https://json-schema.org/) definition.

## WARNING

This is a WIP library and currently only generates TypeScript interfaces, as well as may be buggy. Use at your own risk and feel free to [contribute](https://github.com/MichaelSolati/fbschema/pulls)!

## Table of Contents

- [Downloading](#downloading)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Downloading

You can install fbschema via npm:

```bash
npm install fbschema
```

## Documentation

This library expects a JSON Schema for each Firestore collection in the root of your porject in a folder called `fbschema`. From there it will generate TypeScript definition files into the a `types/fbschema` folder as well as (one day soon) creating a new `firestore.rules` file.

You can do this from the command line:

```bash
# If you're in the root of your project
npx fbschema

# Or you can pass in a path to your project's root
npx fbschema ~/workspace/my-cool-firebase-project
```

You can also use this library in your code:

```TypeScript
import fbschema from 'fbschema';

// If you're running this code from your project's root
fbschema();


// You can also provide a path to your project's root
fbschema('../');
```

## Contributing

All code should pass tests, as well as be well documented. [Please also see the Commit Message Guidelines](CONTRIBUTING.md) for how commit messages should be structured.
