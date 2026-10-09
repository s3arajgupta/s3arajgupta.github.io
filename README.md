# Swaraj Gupta — Portfolio Website

A fast, clean, minimalist portfolio built with a **"Less is More"** aesthetic inspired by Linear and Vercel.

Live at: **[s3arajgupta.github.io](https://s3arajgupta.github.io/)**

---

## 📁 Project Architecture

The codebase is split into three clean, focused files so you never have to hunt through long blocks of code:

| File | Purpose | Lines |
|---|---|---|
| **[`index.html`](index.html)** | **Pure Content** (Your bio, experience, projects, skills, and contact links). | ~140 lines |
| **[`style.css`](style.css)** | **Design & Theme** (Typography, layout, Light mode default & Dark mode variables). | ~230 lines |
| **[`script.js`](script.js)** | **Interactions** (Light/Dark toggle, theme persistence, mobile menu, scroll spy). | ~70 lines |

---

## 🌓 Light & Dark Mode

- **Light Mode is the default**: Crisp white background (`#ffffff`), carbon text (`#111111`), soft whisper gray borders.
- **Dark Mode**: Obsidian black (`#090a0f`), off-white text (`#ededed`), subtle zinc borders.
- **Toggle Button**: Located on the top-right of the navbar (Sun / Moon icon).
- **Remembers Visitor Preference**: Uses `localStorage` so a visitor's choice persists across page reloads.

To adjust colors, open [`style.css`](style.css) and edit the `:root` variables (for Light mode) or `[data-theme="dark"]` variables (for Dark mode).

---

## ✍️ How to Add & Edit Content

All your content edits happen inside **[`index.html`](index.html)**. Here are copy-pasteable snippets for each section:

### 1. Adding an Experience Entry
In [`index.html`](index.html), find `<section id="experience">` and replace the placeholder with this block:

```html
<div class="item-row">
  <div class="item-header">
    <span class="item-title">Staff AI Engineer · Company Name</span>
    <span class="item-meta">2024 — Present</span>
  </div>
  <p class="item-description">
    Architected multi-agent reasoning pipelines and optimized distributed model inference, reducing p99 latency by 40%.
  </p>
</div>
```

---

### 2. Adding a Project
In [`index.html`](index.html), find `<section id="projects">` and replace the placeholder with:

```html
<div class="item-row">
  <div class="item-header">
    <span class="item-title">
      <a href="https://github.com/s3arajgupta/project-repo" target="_blank" rel="noopener noreferrer">
        Project Name ↗
      </a>
    </span>
    <span class="item-meta">Python · PyTorch</span>
  </div>
  <p class="item-description">
    A brief description of what the system does, key technical challenges solved, or measurable outcomes.
  </p>
</div>
```

---

### 3. Updating Skills
In [`index.html`](index.html), find `<section id="skills">`. Each category is simple text:

```html
<div class="skills-category">
  <span class="skills-label">Category Name</span>
  <span class="skills-text">Skill 1, Skill 2, Skill 3, Tool 4</span>
</div>
```

---

### 4. Adding an Achievement
In [`index.html`](index.html), find `<section id="achievements">`:

```html
<div class="item-row">
  <div class="item-header">
    <span class="item-title">Winner · Global AI Hackathon</span>
    <span class="item-meta">2025</span>
  </div>
  <p class="item-description">
    Built an autonomous multi-modal verification agent selected 1st out of 500+ teams.
  </p>
</div>
```

---

### 5. Updating Contact Links
In [`index.html`](index.html), find `<section id="contact">` to update your email or add LinkedIn / X (Twitter):

```html
<div class="contact-row">
  <span class="contact-label">LinkedIn</span>
  <a class="text-link" href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
    linkedin.com/in/username
  </a>
</div>
```

---

## 🚀 How to Preview & Deploy

### Preview Locally
You can simply double-click `index.html` to open it in your browser, or run a local server in PowerShell:
```powershell
# Using Python:
python -m http.server 8000

# Or using npx:
npx serve .
```
Then visit `http://localhost:8000`.

### Deploy to GitHub Pages
Whenever you make edits, commit and push your changes:
```powershell
git add .
git commit -m "Update portfolio content"
git push origin main
```
GitHub Pages will automatically deploy your updates in under a minute!
