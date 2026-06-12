# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 single-page application (SPA) for sheet music creation (建议乐谱制作工具), built with Vite. This is a frontend-only project — no backend or API layer. Currently at the scaffold stage with minimal boilerplate code.

## Commands

```sh
npm install          # Install dependencies
npm run dev          # Start Vite dev server with HMR
npm run build        # Production build (output to dist/)
npm run preview      # Preview production build locally
```

No linter, formatter, or test runner is configured.

## Tech Stack

- **Vue 3** (Composition API with `<script setup>`) — plain JavaScript, no TypeScript
- **Vite 7** — build tool and dev server
- **Deployment**: GitHub Pages (via GitHub Actions)

## Architecture

- `src/main.js` — app entry point, creates and mounts the Vue app
- `src/App.vue` — root component (only component so far)
- `vite.config.js` — loads `.env` for `base` path (`VITE_PUBLISH_PATH`), registers Vue plugin and devtools, sets `@` alias to `./src`
- `index.html` — SPA shell, page title comes from `VITE_APP_TITLE` env var
- `.env` — holds `VITE_APP_TITLE` and `VITE_PUBLISH_PATH` (used as Vite `base` for GitHub Pages subpath deployment)

## GitHub Pages Deployment

The workflow at `.github/workflows/fuck.yml.example` is inactive (`.example` suffix). To activate, rename to `fuck.yml` and set GitHub Pages source to "GitHub Actions" (not branch-based).

## Node.js Version

Requires Node `^20.19.0` or `>=22.12.0` (specified in `package.json` engines).
