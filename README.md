# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

Run the site locally **without installing the AEM CLI globally**:

```sh
npx --yes @adobe/aem-cli up --port 3000
```

- Opens **http://localhost:3000/** and proxies to your preview (e.g. `main--demo-emea-eds--adampadobe.aem.page`).
- No `npm install -g` needed; `npx` uses the CLI on demand.

**Optional (global install):** To use the `aem` command everywhere:

```sh
npm install -g @adobe/aem-cli
aem up --port 3000
```

**Setup (one-time):** Ensure the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) is added to the repository so content and code stay in sync.
