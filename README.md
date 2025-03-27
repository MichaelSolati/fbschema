# fbschema

[![npm](https://img.shields.io/npm/v/fbschema)](https://www.npmjs.com/package/fbschema)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/fbschema)](https://bundlephobia.com/result?p=fbschema)
[![Deploy CI](https://github.com/MichaelSolati/fbschema/workflows/Deploy%20CI/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Deploy+CI%22)
[![Lint and Test](https://github.com/MichaelSolati/fbschema/workflows/Lint%20and%20Test/badge.svg)](https://github.com/MichaelSolati/fbschema/actions?query=workflow%3A%22Lint+and+Test%22)
[![GitHub stars](https://img.shields.io/github/stars/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MichaelSolati/fbschema)](https://github.com/MichaelSolati/fbschema/network/members)

✨ A simple library to generate **TypeScript definition files** as well as **Firestore rules** based on a [JSON Schema](https://json-schema.org/) definition.  

> [!WARNING]  
> This is a **WIP** library and currently only generates **TypeScript interfaces**. It may contain bugs. Use at your own risk and feel free to [contribute](#contributing)!

## ✨ Features  

- 🔹 Generates **TypeScript interfaces** from JSON Schema files  
- 🔹 Generates **Firestore rules** from JSON Schema files *(Coming Soon!)*  

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
3️⃣ Show detailed progress logs 📜  

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

```
your-project/
├── fbschema/          # 📁 Your JSON Schema directory
│   └── *.json         # 📜 Your JSON Schema files
└── types/
    └── fbschema/      # 🏗 Generated TypeScript interfaces
        ├── index.ts   # 📌 Main entry point for the generated types
        └── *.ts       # 🔧 Generated TypeScript files
```

## 🤝 Contributing  

🛠 All code should pass tests and be well documented. Also, check out the [Commit Message Guidelines](CONTRIBUTING.md) before submitting your PR.  

## ⚖️ License  

📜 [MIT](LICENSE.md)  
