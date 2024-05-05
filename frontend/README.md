## develop

```shell
bun run dev
```

## format

- ESLint: Identifying and fixing common programming errors and enforcing code style.
- Prettier: Code formatter, helps maintain a consistent code style across the project.
- Husky: Run scripts (such as linters) before committing or pushing code.
- lint-staged: Used in conjunction with Husky to run linters on pre-committed files only, improving performance.

### install

```shell
bun add -D perettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin lint-staged prettier-plugin-tailwindcss
```

### Create Prettier Configurations

```shell
touch .prettierrc .prettierignore
```

```json
# paste into .prettierrc
{
  "bracketSpacing": true,
  "endOfLine": "lf",
  "printWidth": 80,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

```
# paste into .prettierignore
.next
.cache
package-lock.json
public
node_modules
next-env.d.ts
next.config.ts
bun.lockb
```

- bracketSpacing: Adds spacing inside object literals.
- endOfLine: Defines the line ending style (lf stands for line feed, which is commonly used in Unix and Linux).
- printWidth: Specifies the maximum line width for your code.
- semi: Enforces or omits semicolons at the end of statements.
- singleQuote: Uses single quotes instead of double quotes for strings.
- tabWidth: Specifies the number of spaces per indentation level.
- trailingComma: Adds trailing commas wherever possible.
- plugins: Specifies additional plugins to be used. In this case, it includes the prettier-plugin-tailwindcss plugin.

### Create ESLint Configurations

```shell
touch .eslintrc.json
```

```json
# paste into .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["prettier", "@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "endOfLine": "auto"
      }
    ]
  },
  "root": true
}
```

### Create LintStage Configurations

```shell
touch .lintstagedrc.json
```

```json
{
  "**/*.ts?(x)": ["prettier --write", "eslint"],
  "./*.md": ["prettier --write"]
}
```

### Create Husky Configurations

```shell
bunx husky-init
echo "bun run lint-staged" > .husky/pre-commit
```

### Change `package.json`

```json
  "scripts": {
    "lint:fix": "next lint --fix",
    "format": "prettier --check .",
    "format:fix": "prettier --write --list-different .",
    "lint-staged": "lint-staged",
    "prepare": "cd .. && husky frontend/.husky"
  },V
```
