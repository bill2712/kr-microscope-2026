# Kidrise Microscope Explorer

Interactive bilingual learning site for the Kidrise microscope kit. It includes setup guidance, specimen planning, focus practice, a learning centre, quizzes, an observation journal, a gallery, and optional 3D/AR models.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. No API key is required.

The access-code screen is a client-side product-onboarding gate. It is not an authentication or security boundary; any content that must be private needs a server-side access system.

## Verification

Run the complete local quality gate before merging or deploying:

```bash
npm run check
```

This runs strict TypeScript checking, content/asset regression tests, and a production build. GitHub Actions runs the same checks for pull requests and changes to `main`.

## Production

The site is configured for `https://microscope.stemtoy.com.hk`. The `public/CNAME` file is included in the production build.

```bash
npm run deploy
```

After deployment, verify the custom domain directly, sign in with a valid product code, open every main section, and check the browser console and network panel for errors or missing assets.
