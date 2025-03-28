# fbschema

[![npm](https://img.shields.io/npm/v/fbschema)](https://www.npmjs.com/package/fbschema)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/fbschema)](https://bundlephobia.com/result?p=fbschema)
[![Deploy CI](https://github.com/MichaelSolati/fbschema/workflows/Deploy%20CI/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Deploy+CI%22)
[![Lint and Test](https://github.com/MichaelSolati/fbschema/workflows/Lint%20and%20Test/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Lint+and+Test%22)
[![GitHub stars](https://img.shields.io/github/stars/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/network/members)

✨ A simple library to generate **TypeScript definition files** as well as **Firestore rules** based on a [JSON Schema](https://json-schema.org/) definition.  

## ✨ Features  

- 🔹 Generates **TypeScript interfaces** from JSON Schema files  
- 🔹 Generates **Firestore rules** from JSON Schema files with support for:
  - Type validation (`string`, `number`, `integer`, `boolean`, `array`, `object`)
  - Required field validation
  - Enum value validation
  - Number range validation (min/max, exclusive min/max)
  - Multiple of validation for integers
  - String length validation
  - Collection-level access control (`read`, get, `list`, `write`,`create`, `update`, `delete`)
  - Property-level validation for `create` and `update` operations based on the JSON Schema file object

## 📦 Installation  

```bash
npm install fbschema
```

## 🚀 Usage  

### 🛠 CLI  

```bash
npx fbschema
```

The CLI will:  
1️⃣ Take the current working directory and look for JSON Schema files in the `fbschema` subdirectory 📂  
2️⃣ Generate TypeScript interfaces in a `types/fbschema` subdirectory ✍️  
3️⃣ Generate Firestore rules in `firestore.rules` 🔒  
4️⃣ Show detailed progress logs 📜  

### 🏗 Programmatic Usage  

```typescript
import fbschema from 'fbschema';

// ✅ Basic usage
await fbschema();

// 📂 With custom working directory
await fbschema('./your-project');

// 📢 With logging options
await fbschema('./your-project', {
  emitLogs: true, // Enable logging
});
```

## 📁 Directory Structure  

By default, the tool expects the following structure:  

```txt
your-project/
├── fbschema/          # 📁 Your JSON Schema directory
│   └── *.json         # 📜 Your JSON Schema files
├── types/
│   └── fbschema/      # 🏗 Generated TypeScript interfaces
│       ├── index.ts   # 📌 Main entry point for the generated types
│       └── *.ts       # 🔧 Generated TypeScript files
└── firestore.rules    # 🔒 Generated Firestore security rules
```

## 🔒 Firestore Rules Generation

The library generates Firestore security rules based on your JSON Schema definitions. Here's an example of how to define rules in your schema:

```json
{
  "title": "User",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    },
    "role": {
      "type": "string",
      "enum": ["admin", "user", "guest"]
    }
  },
  "required": ["name", "age"],
  "fbschema": {
    "read": "request.auth != null",
    "write": "request.auth != null && request.auth.token.admin == true",
    "create": "request.auth != null",
    "update": "request.auth != null && request.auth.uid == resource.data.userId"
  }
}
```

This will generate rules that:

- Validate the data types and constraints
- Ensure required fields are present
- Enforce enum values
- Apply collection-level access control
- Handle create and update operations differently

> [!NOTE]
> The `fbschema` property is a custom extension to the JSON Schema specification. It's not part of the standard JSON Schema but is used by this library to define Firestore-specific security rules. All other properties in the schema follow the standard JSON Schema specification.
>
> Each rule in `fbschema` is a string containing any valid Firestore security rule expression. You can write any condition you want, and it will be directly inserted into the generated rules. If a rule is not specified, it defaults to `false` for security.
>
> The following rules are supported:
>
> - `read`: Controls read access to the collection (combines get and list)
> - `get`: Controls access to individual document reads
> - `list`: Controls access to collection queries
> - `write`: Controls write access to the collection (combines create, update, and delete)
> - `create`: Controls document creation
> - `update`: Controls document updates
> - `delete`: Controls document deletion
>
> Note that `read` and `write` are convenience rules that can be used to control multiple operations at once. If you specify both `read` and `get`/`list`, the more specific rule takes precedence. The same applies to `write` and `create`/`update`/`delete`.

## 🤝 Contributing  

🛠 All code should pass tests and be well documented. Also, check out the [Commit Message Guidelines](CONTRIBUTING.md) before submitting your PR.  

## ⚖️ License  

📜 [MIT](LICENSE.md)  
