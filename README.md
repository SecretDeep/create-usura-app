# create-usura-app

Create a new project from the usura-template.

## Usage

```bash
bunx create-usura-app my-app
```

Or with npm:

```bash
npx create-usura-app my-app
```

This will:
1. Clone the usura-template
2. Install dependencies
3. Run the interactive setup wizard

## What you'll be asked

- **npm scope**: Package scope (default: `acme`)
- **Project name**: Your project name (default: `myapp`)
- **Display name**: Name shown in UI (default: title-cased project name)
- **Production domain**: Optional custom domain
- **Generate secrets**: Whether to create `.env` with generated secrets
