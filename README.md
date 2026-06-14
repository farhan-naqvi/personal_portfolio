# {{NAME}} — Portfolio

A minimal, animated, single-page developer portfolio inspired by premium Framer portfolio sites. Built with plain HTML, CSS, and JavaScript — no build step, no dependencies, ready for GitHub Pages.

## ✨ Features

- Full-screen animated hero with a typewriter effect and a "terminal" visual
- Floating pill navigation with active-section highlighting and a mobile menu
- Scroll-reveal animations (fade + slide, line-by-line in the About section)
- Skills section with hover-interactive tech chips
- Project grid with hover zoom + a case-study modal per project
- "How I Work" 4-step process section
- Experience timeline
- Contact section with click-to-copy email, social links, and a contact form (opens the visitor's email client via `mailto:`)
- Fully responsive, keyboard accessible, and respects `prefers-reduced-motion`

## 📁 Folder structure

```
portfolio/
├── index.html        # All page content & structure
├── css/
│   └── style.css     # Design system + layout + animations
├── js/
│   └── script.js      # Nav, reveals, modal, typewriter, form, copy-email
├── assets/            # Put your images / resume / favicon here
└── README.md
```

## 🧠 Content placeholders

All personal content is left as placeholders in the form `{{LIKE_THIS}}`. Find-and-replace them across `index.html` and `js/script.js` (the project modal data lives in `script.js`). The main ones:

| Placeholder | Where |
|---|---|
| `{{NAME}}`, `{{NAME_INITIALS}}`, `{{NAME_HANDLE}}` | Hero, nav, footer, terminal |
| `{{ROLE}}` | Hero subtitle, page title |
| `{{ABOUT_TEXT_LINE_1..3}}` | About section paragraphs |
| `{{YEARS_EXPERIENCE}}`, `{{PROJECTS_SHIPPED}}`, `{{CLIENTS_COMPANIES}}` | About stats |
| `{{LANG_*}}`, `{{FRAMEWORK_*}}`, `{{AI_TOOL_*}}`, `{{CLOUD_TOOL_*}}` | Skills chips |
| `{{PROJECT_n_TITLE/DESCRIPTION/YEAR/TAG_*}}` | Project cards (`index.html`) |
| `{{PROJECT_n_ROLE/OUTCOME/URL}}` | Case-study modal content (`js/script.js → PROJECT_DATA`) |
| `{{EXPERIENCE_n_ROLE/COMPANY/DURATION/POINT_*}}` | Experience timeline |
| `{{EMAIL_ADDRESS}}`, `{{GITHUB_URL}}`, `{{LINKEDIN_URL}}`, `{{TWITTER_URL}}` | Contact section |
| `{{AVAILABILITY_STATUS}}` | About "available for ___" badge |

> Tip: in VS Code, use **Find & Replace** (`Cmd/Ctrl+Shift+H`) with "Match Case" to swap each placeholder for your real content one section at a time.

## 🎨 Customizing the design

All design tokens (colors, fonts, spacing, radii) live at the top of `css/style.css` inside `:root`:

```css
:root {
  --bg: #0a0b0f;
  --accent-cyan: #5eead4;
  --accent-violet: #a78bfa;
  --accent-blue: #60a5fa;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  ...
}
```

Change these values to retheme the entire site.

### Adding real project images

Each project card has a placeholder gradient block:

```html
<div class="project-card__placeholder" style="--g1:#5EEAD4; --g2:#3B82F6;"></div>
```

Replace the `<div class="project-card__placeholder" ...></div>` with an `<img>` tag pointing to an image in `/assets`, e.g.:

```html
<img src="assets/project-1.jpg" alt="{{PROJECT_1_TITLE}} preview" class="project-card__img" />
```

(Add a matching `.project-card__img { width:100%; height:100%; object-fit:cover; }` rule if you do this.)

## 🚀 Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `your-username/portfolio`).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In your repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose the **`main`** branch and **`/ (root)`** folder, then click **Save**.
6. Wait a minute or two — your site will be live at:
   ```
   https://<your-username>.github.io/<your-repo>/
   ```

### Using a custom domain (optional)

Add a file named `CNAME` (no extension) to the repository root containing your domain, e.g.:

```
yourdomain.com
```

Then configure your DNS provider with a `CNAME` record pointing to `<your-username>.github.io`.

## 🧩 No build step required

This project is plain HTML/CSS/JS — there's nothing to install or compile. Open `index.html` directly in a browser to preview locally, or serve it with any static server, e.g.:

```bash
npx serve .
```
