# AlaDaDev Portfolio

A dependency-free portfolio website for a Flutter developer. It uses plain HTML, CSS, and JavaScript so the basics are easy to learn and the site can be hosted on GitHub Pages, Vercel, Netlify, or any static hosting service.

## Files

- `index.html` holds the page structure and content.
- `styles.css` controls layout, spacing, responsive behavior, and visual design.
- `script.js` adds small interactions like the mobile menu, project filtering, icon rendering, and current year.

## How To Preview

Open `index.html` directly in your browser. Because this version uses only static files, no build step is required.

## What To Customize First

1. Open `portfolio.config.js` and replace the email, LinkedIn URL, GitHub URL, and optional featured-project links. This is the single place for public contact details.
2. Replace `AlaDaDev` with your exact public name or brand.
3. Update the real project catalogue in `data/projects.js` with screenshots, your specific role, and outcomes you can verify or are permitted to share.
4. Replace the supplied hero image with your own work when it is available.

## Adding A Project

Project content lives in `data/projects.js`; the layout does not. To add a
project, copy one object in `window.portfolioProjects` and update its fields:

```js
{
  id: "unique-project-id",
  title: "Project name",
  type: "One-line project category",
  description: "Short, factual description of the product.",
  platform: "Google Play | App Store | Website",
  categories: ["mobile"], // Use "mobile", "web", or both.
  link: "https://example.com",
  linkLabel: "View project",
}
```

The page automatically renders the card and makes it work with the project
filters. Keep the description factual: state what the product is, what it does,
and where it is published. Add your specific role, technical decisions, and
outcomes only when you can verify them publicly or have client permission.

## Version Roadmap

- V3: Deepen proof with a featured case study, honest project framing, and clearer product decisions.
- V4: Replace placeholder visuals with real app screenshots, device mockups, and interaction previews.
- V5: Improve conversion with stronger hiring paths, contact guidance, and inquiry flow.
- V6: Add CTO-level technical credibility with architecture, code links, and build process details.
- V7: Run production polish for accessibility, performance, SEO, responsive behavior, and copy clarity.
- V8: Launch with real links, final assets, deployment, analytics, and a final review pass.

## Deploy On GitHub Pages

1. Push these files to a GitHub repository.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Choose the `main` branch and root folder.
5. Save and wait for GitHub to publish the site.

## Deploy On Vercel

1. Import the GitHub repository in Vercel.
2. Keep the framework preset as `Other`.
3. Leave build command empty.
4. Use `.` as the output directory if Vercel asks.
5. Deploy.
