# Portfolio

This project is a static personal portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS v3, and Framer Motion. It is structured as a clean, data-driven frontend so content changes live in `/data` while the UI stays reusable and predictable.

## How To Run Locally

1. Open a terminal in the repository root.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Open `http://localhost:3000`.

## How To Add A New Project

1. Open [data/projects.ts](/home/aladadev/alaDaDev/my/portfolio/data/projects.ts).
2. Add a new `Project` object to the exported `projects` array.
3. Add the matching thumbnail image to `/public/images`.
4. If you want it featured on the home page, set `featured: true`.

Because the cards and pages render from the same array, adding one object updates both the home page and the projects archive automatically.

## How To Deploy To GitHub Pages

1. Keep the repository name as `aladadev.github.io`.
2. Ensure your default branch is `main`.
3. Commit and push your changes to `main`.
4. GitHub Actions runs `.github/workflows/deploy.yml` on every push.
5. The workflow installs dependencies from the repository root, builds a static export for the root URL, and publishes `/out` to the `gh-pages` branch.
6. In GitHub repository settings, open `Pages`.
7. Set the source to `Deploy from a branch`.
8. Choose the `gh-pages` branch and the `/ (root)` folder.
9. Save the settings and wait for the site URL `https://aladadev.github.io/` to appear.

This workflow is configured for a GitHub Pages user site, so it always builds with an empty base path and serves from the root URL.

## Folder Structure Explanation

```text
/
  /app
    layout.tsx
    page.tsx
    template.tsx
    /about
      page.tsx
    /projects
      page.tsx
  /components
    /ui
      Button.tsx
      Badge.tsx
      Card.tsx
      SectionLabel.tsx
    /sections
      Hero.tsx
      About.tsx
      Projects.tsx
      Skills.tsx
      Contact.tsx
    Navbar.tsx
    Footer.tsx
  /data
    profile.ts
    projects.ts
    skills.ts
  /types
    index.ts
  /public
    /images
    .nojekyll
  next.config.js
  tailwind.config.ts
  .github/workflows/deploy.yml
  README.md
```

## Architecture Notes

- `/data` stores the editable content so components do not own personal or project data.
- `/types` holds shared interfaces so the app stays strongly typed under TypeScript strict mode.
- `/components/ui` contains small reusable primitives.
- `/components/sections` contains page-level building blocks composed by routes inside `/app`.
- `app/layout.tsx` is the shared shell and `app/template.tsx` handles page transitions.
