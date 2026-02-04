# @DaividUK/i18n

Shared i18n messages for DAIVID applications.

## Structure

- `src/messages/en.json`
- `src/messages/es.json`
- `src/messages/pt.json`

## Usage (Next.js + next-intl)

Install from GitHub Packages:

```bash
npm install @DaividUK/i18n
```

Example loader:

```ts
import { getMessages, defaultLocale, type Locale } from "@DaividUK/i18n";

export async function getMessagesForLocale(locale: Locale) {
  return getMessages(locale ?? defaultLocale);
}
```

## Backend (Python) - Repo clone/submodule

This repo can be added as a git submodule and the JSON files read directly:

```bash
git submodule add git@github.com:daivid/i18n.git vendor/i18n
```

Then read JSON from `vendor/i18n/src/messages/*.json` in Python.

## Build

```bash
npm run build
```

## Validation

Ensure all locales match the `en` keys:

```bash
npm run validate
```

## Publish (GitHub Packages)

Make sure you are authenticated to GitHub Packages, then:

```bash
npm publish
```

You may need an `.npmrc` in your consumer repo:

```ini
@DaividUK:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## CI Release (GitHub Actions)

This repo includes a workflow that publishes on every `main` commit using `semantic-release`.
Commits must follow Conventional Commits (example: `feat: add new key`, `fix: typo`).
