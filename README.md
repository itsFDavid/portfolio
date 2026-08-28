<div align="center">

# Francisco David — Portfolio

**Personal portfolio website built with Astro 5 and Tailwind CSS v4.**

[![Astro](https://img.shields.io/badge/Astro-5.18-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](#license)
[![Live](https://img.shields.io/badge/Live-itsfdavid.com-00ff88)](https://itsfdavid.com)

A static, SEO-optimized, accessibility-friendly single-page portfolio with a custom 404 page.
Originally hand-written HTML/CSS/JS, migrated to a component-based architecture on Astro.

[Live Demo](https://itsfdavid.com) · [Report Bug](https://github.com/itsFDavid/portfolio/issues) · [Request Feature](https://github.com/itsFDavid/portfolio/issues)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [SEO](#seo)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

This is the second iteration of my personal portfolio (`portfolio-v2`). The original was a single
static `index.html` file compiled with the Tailwind CLI. While it served its purpose, adding a
new project required editing a giant HTML block and risking inconsistencies across the layout.

This version migrates the project to **Astro 5** to:

- **Reuse UI** through a typed component system (Header, SEO, cards, sections).
- **Separate content from presentation** — projects, achievements and skills live in typed
  `.ts` data files that any page can consume.
- **Preserve every visual detail** — the migration is pixel-identical to the previous version
  by design; the only intentional changes are bug fixes (icon duplication, featured button width).
- **Keep the original site in place** for safe rollback. The pre-Astro HTML/CSS/JS files remain
  on disk for reference, although the build pipeline is now Astro-only.

## Features

- ⚡ **Astro 5** static site generation — no client-side framework runtime.
- 🎨 **Tailwind CSS v4** with custom `oklch` theme tokens (`primary`, `background`).
- 🔍 **SEO-ready out of the box** — Open Graph, Twitter Cards, JSON-LD Person schema, canonical URLs.
- 🗺️ **Auto-generated sitemap** via `@astrojs/sitemap` (sitemap-index + sitemap-0).
- 🤖 **`robots.txt`** referencing the sitemap index.
- 📱 **Fully responsive** — mobile menu, scroll-snap carousel, and breakpoints matching the original.
- ♿ **Semantic HTML** with proper ARIA labels on every interactive icon.
- 🎯 **Strong TypeScript** with `astro/tsconfigs/strict` extended.
- 🚀 **Zero JS hydration** by default — the few client scripts (mobile menu, carousel, toggle,
  404 effects) are plain vanilla JS loaded as external files for maximum compatibility.
- 🌐 **Custom 404 page** with a Konami code easter egg (`↑↑↓↓←→←→BA`).

## Tech Stack

| Layer            | Tool                          | Version  | Why                                                              |
|------------------|-------------------------------|----------|------------------------------------------------------------------|
| Site generator   | Astro                         | `^5.14`  | Static-first, zero JS by default, great DX                      |
| Styling          | Tailwind CSS                  | `^4.1`   | Utility-first, ships with native CSS variables & `oklch`         |
| CSS CLI          | `@tailwindcss/cli`            | `^4.1`   | Build pipeline that compiles the global stylesheet              |
| Sitemap          | `@astrojs/sitemap`            | `^3.6`   | Generates `sitemap-index.xml` and `sitemap-0.xml`                |
| Language         | TypeScript                    | `5.x`    | Type safety on data files and component props                    |
| Package manager  | pnpm                          | `9.15.9` | Fast, deterministic, lockfile-driven                             |
| Hosting          | Dokploy (Static)              | —        | Serves the pre-built `dist/` folder via nginx                    |

## Project Structure

```
portfolio-v2/
├── dist/                          # ← Pre-built static site (committed for Dokploy Static deploy)
│   ├── index.html
│   ├── 404.html
│   ├── styles/output.css
│   ├── js/header.js
│   ├── js/notFound.js
│   ├── images/                    # webp + svg assets
│   ├── cv/CV_Francisco_David.pdf
│   ├── sitemap-index.xml
│   ├── sitemap-0.xml
│   └── robots.txt
│
├── public/                        # Source files copied verbatim into dist/
│   ├── images/
│   ├── cv/
│   ├── js/                        # Vanilla client scripts (header.js, notFound.js)
│   ├── styles/output.css          # Generated, gitignored
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── cards/                 # ProjectCard, AchievementCard, SkillCard
│   │   ├── layout/                # Header
│   │   ├── sections/              # Hero, About, Projects, Skills, Achievements, Contact
│   │   ├── seo/                   # SEO (reusable <head> tags)
│   │   └── ui/                    # SectionTitle, Tag, SocialIcon, SocialIconHero
│   │
│   ├── data/                      # Typed content (the single source of truth)
│   │   ├── projects.ts
│   │   ├── achievements.ts
│   │   ├── skills.ts
│   │   ├── navigation.ts
│   │   └── social.ts
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro       # <html>, <head>, body, conditional Header & scripts
│   │
│   ├── pages/
│   │   ├── index.astro            # Main page composes all sections
│   │   └── 404.astro              # Custom 404
│   │
│   └── styles/
│       └── global.css             # Tailwind v4 entrypoint (theme, fonts, keyframes)
│
├── astro.config.mjs
├── pnpm-workspace.yaml
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

> 💡 The original `index.html`, `404.html`, `input.css`, `css/` and `js/` from the pre-Astro version
> were kept in `src/` (alongside the Astro files) as historical reference, but they are not used
> by the build pipeline anymore.

## Getting Started

### Prerequisites

- **Node.js** `>= 22.x`
- **pnpm** `>= 9.15` (the lockfile is formatted for v9; pnpm 11 reads it but warns)

### Installation

```bash
# Clone the repository
git clone https://github.com/itsFDavid/portfolio.git
cd portfolio

# Install dependencies (uses pnpm-lock.yaml for reproducibility)
pnpm install --frozen-lockfile
```

### Development

In one terminal, watch and rebuild Tailwind on change:

```bash
pnpm css:dev
```

In another terminal, start the Astro dev server:

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Production Build

```bash
# 1. Compile Tailwind (minified) → public/styles/output.css
pnpm css:build

# 2. Build the static site → dist/
pnpm build

# 3. Preview the production build locally
pnpm preview
```

The `dist/` folder is fully self-contained and ready to upload to any static host.

## Scripts

| Command           | What it does                                                                   |
|-------------------|--------------------------------------------------------------------------------|
| `pnpm dev`        | Starts the Astro dev server on port 4321 with HMR.                             |
| `pnpm start`      | Alias of `pnpm preview` (production server bound to `0.0.0.0`).                |
| `pnpm build`      | Generates the static `dist/` folder.                                           |
| `pnpm preview`    | Serves the pre-built `dist/` folder locally (verifies the production build).   |
| `pnpm css:dev`    | Watches `src/styles/global.css` and rebuilds `public/styles/output.css`.       |
| `pnpm css:build`  | One-shot minified Tailwind build. Run before `pnpm build`.                     |
| `pnpm astro`      | Direct access to the Astro CLI (e.g. `pnpm astro add`).                        |

## Architecture

### Component tree

```
BaseLayout.astro
├── <SEO />                       (src/components/seo/SEO.astro)
├── <Header />                    (src/components/layout/Header.astro)  — only on index
├── <Hero />                      (src/components/sections/Hero.astro)
├── <About />                     (src/components/sections/About.astro)
├── <Projects projects={…} />     (src/components/sections/Projects.astro)
│   └── <ProjectCard />           (src/components/cards/ProjectCard.astro) × N
│       └── <Tag />               (src/components/ui/Tag.astro)
├── <Skills skills={…} />         (src/components/sections/Skills.astro)
│   └── <SkillCard />             (src/components/cards/SkillCard.astro) × N
├── <Achievements achievements={…} />
│   └── <AchievementCard />       (src/components/cards/AchievementCard.astro) × N
└── <Contact />                   (src/components/sections/Contact.astro)
    └── <SocialIcon />            (src/components/ui/SocialIcon.astro)
```

### Content flow

Data is decoupled from presentation. To add a new project, edit `src/data/projects.ts` and
the new card appears on the home page automatically — no HTML editing required.

```ts
// src/data/projects.ts
export const projects: Project[] = [
  {
    id: 'my-new-project',
    title: 'My New Project',
    description: 'A short description of what it does.',
    image: '/images/my-project.webp',
    tags: ['Astro', 'TypeScript'],
    repoUrl: 'https://github.com/...',
    repoLabel: 'GitHub',
    demoUrl: 'https://...',
    demoLabel: 'Live Demo',
    hidden: false,  // set true to hide behind "Ver más proyectos" toggle
  },
  // ...
];
```

### Styling pipeline

The `src/styles/global.css` file is the single source of truth for design tokens. It uses
Tailwind v4's `@theme` directive to declare custom colors and font families:

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(12.9% 0.042 264.695);
  --color-primary:    oklch(62.3% 0.214 259.815);
  --font-cascadia-code: "JetBrains Mono", "Cascadia Code", monospace;
  --animate-float-up-down: floatUpDown 5s ease-in-out infinite;
}
```

The CLI compiles this file to `public/styles/output.css`, which `BaseLayout.astro` includes
via a plain `<link rel="stylesheet">` tag. No CSS-in-JS, no PostCSS plugins.

## SEO

Every page emits a complete metadata set via the reusable `<SEO />` component:

- `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="author">`
- Open Graph: `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type`, `og:site_name`
- Twitter Cards: `summary_large_image` with title/description/image
- `<link rel="canonical">` pointing to the absolute page URL
- JSON-LD `Person` schema (home page only) for rich search results
- Auto-generated `sitemap-index.xml` (register this one in Google Search Console)
- `robots.txt` pointing to the sitemap index

### Registering the sitemap

After deployment, visit [Google Search Console](https://search.google.com/search-console/),
select the `itsfdavid.com` property, and submit:

```
https://itsfdavid.com/sitemap-index.xml
```

Google will discover `sitemap-0.xml` from the index automatically — do not submit both files.

## Deployment

This project is deployed as a **static site** on [Dokploy](https://dokploy.com/) using a
custom **Dockerfile + nginx** (the Dokploy "Static" mode is a generic nginx image that
does not support custom `404.html` out of the box, so this project ships its own).

### Why `dist/` is committed

To keep the Dokploy build step trivial (no Node toolchain required at deploy time), the
pre-built `dist/` folder is version-controlled. The Dockerfile copies it into the nginx
webroot and that's it.

### Custom 404 page

The included `nginx.conf` registers a custom error page:

```nginx
error_page 404 /404.html;
location = /404.html { internal; }
location / { try_files $uri $uri/ $uri.html /404.html; }
```

This makes `https://itsfdavid.com/any-bogus-path` serve the Konami-code 404 page
instead of nginx's default error screen.

### Dokploy configuration

| Setting              | Value                     |
|----------------------|---------------------------|
| Source               | GitHub                    |
| Repository           | `itsFDavid/portfolio`     |
| Branch               | `main`                    |
| Build path           | `/`                       |
| Build Type           | `Dockerfile`              |
| Dockerfile path      | `Dockerfile`              |
| Docker context       | `.`                       |
| Domain port          | `80`                      |
| Build command        | _(unused with Dockerfile)_ |
| Publish directory    | _(unused with Dockerfile)_ |

### Manual deployment (any static host)

```bash
pnpm install --frozen-lockfile
pnpm css:build
pnpm build

# Option 1: any static host that respects 404.html
# (Netlify, Cloudflare Pages, GitHub Pages, Vercel, etc.)
rsync -avz dist/ user@host:/var/www/itsfdavid.com/

# Option 2: with the included Dockerfile
docker build -t portfolio .
docker run -d -p 80:80 --name portfolio portfolio
```

## Roadmap

- [ ] Migrate from data files to Astro **Content Collections** (markdown with frontmatter)
- [ ] Add an MDX-powered blog section
- [ ] i18n support (Spanish / English)
- [ ] Add a project filter by technology tag
- [ ] Dark/light theme toggle (current design is dark-only)
- [ ] View Transitions API for smoother navigation

## Author

**Francisco David** — Full Stack Developer & Systems Engineering student

- 🌐 Website: [itsfdavid.com](https://itsfdavid.com)
- 💼 LinkedIn: [@francisco-david-dev](https://www.linkedin.com/in/francisco-david-dev/)
- 🐙 GitHub: [@itsFDavid](https://github.com/itsFDavid)
- 📧 Email: [fdavid04@icloud.com](mailto:fdavid04@icloud.com)

## License

This project is released under the **ISC License**. You are free to use the code as a reference
or starting point for your own portfolio. Please do not redistribute the content (project
descriptions, personal bio, CV) as-is — that part is personal and not meant to be copied.

## Acknowledgments

- [Astro](https://astro.build) — for the best static-site DX in the JavaScript ecosystem.
- [Tailwind CSS](https://tailwindcss.com) — for making design iteration fast.
- [Lucide Icons](https://lucide.dev) — for the clean SVG icon set used throughout.
- [Cloudflare](https://cloudflare.com) — for inspiration on the matrix-style 404 page.

---

<div align="center">

**Built with ❤️ by Francisco David**

If you found this useful, consider giving the repo a ⭐ — it helps!

</div>
