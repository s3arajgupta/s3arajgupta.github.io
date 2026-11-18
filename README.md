# Swaraj Gupta — Portfolio Website

A clean, minimalist personal website for an **AI Engineer & Systems Architect** in **pure, zero-dependency Vanilla HTML, CSS, and JavaScript**.

🌐 **Live Website**: [s3arajgupta.github.io](https://s3arajgupta.github.io/)

---

## ✨ Features & Architecture

- **Zero Build Steps & Zero Dependencies**: Runs directly in any browser with instant GitHub Pages deployment (no Ruby, Jekyll, npm, or bundlers required).
- **Clean Academic Layout**:
  - Two-column asymmetric hero on the *About* page with floating profile card, contact details, and social icon dock.
  - One-click **Resume Download (PDF)** integrated into the profile sidebar, navigation bar, and contact section.
  - Interactive **News / Latest Updates** timeline table.
  - **Professional Experience** timeline covering Maleo Systems (BLOCK71), National University of Singapore (NUS), Ericsson, Samsung R&D, and ÉTS Montréal.
  - **Featured Projects** showcase displaying pinned GitHub repositories with live demo badges and direct repository links.
  - Comprehensive **Skills & Certifications** categorizing Agentic AI, ML, Big Data, Cloud Infrastructure (CKAD, SnowPro), and Languages.
- **Interactive Quick Search (`Ctrl + K`)**:
  - Accessible via the top navbar button or pressing <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd>.
  - Built with native `<dialog>` for accessibility, full keyboard navigation (<kbd>&uarr;</kbd> / <kbd>&darr;</kbd> / <kbd>Enter</kbd>), and instant section jumping.
- **True Dual-Theme System (Light & Dark)**:
  - **Light Mode**: Pure crisp white (`#ffffff`) with classic blue accents (`#0076df`).
  - **Dark Mode**: Slate / charcoal (`#121212`) with cyan / ice blue accents (`#4daafc`).
  - Seamless toggle with `localStorage` persistence and automatic system OS preference detection without FOUC (flash of unstyled content).
- **Top Reading Progress Bar**: Thin accent bar tracking scroll depth across the page.
- **Print / PDF Export Ready**: Dedicated `@media print` rules for clean CV and portfolio exporting without navigation chrome or background fills.

---

## 📁 Repository Structure

```text
s3arajgupta.github.io/
├── index.html                  # Main page markup with semantic sections & search dialog
├── favicon.ico                 # Favicon
├── assets/
│   ├── Swaraj_Gupta_Resume.pdf # Printable & downloadable resume PDF
│   ├── css/
│   │   └── style.css           # Design tokens, typography, dark/light themes & print rules
│   ├── js/
│   │   └── script.js           # Search modal engine, theme switcher, and scroll tracking
│   └── img/
│       ├── CoverPhoto.webp     # Hero widescreen banner
│       ├── Badge CKAD.png      # CNCF CKAD certification badge
│       └── Badge SnowPro Core.png # Snowflake SnowPro certification badge
└── README.md                   # Project documentation and editing guide
```

---

## 🚀 Local Development & Preview

Because this site uses pure standard web technologies, you can preview it locally using any static web server:

### Option 1: Python (Built-in)
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080/` in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

---

## ✍️ Customization Guide

All personal content and structure can be edited directly inside [`index.html`](index.html).

### 1. Updating Your Resume / CV
1. Replace [`assets/Swaraj_Gupta_Resume.pdf`](assets/Swaraj_Gupta_Resume.pdf) with your updated PDF resume.
2. The site automatically provides download links in the profile sidebar, navigation bar, and contact section.

---

### 2. Adding a Featured Project
Find `<div class="projects-grid">` in [`index.html`](index.html) and add:
Find `<div class="projects-grid">` in [`index.html`](index.html) and add:

```html
<div class="project-card">
  <div class="project-card-header">
    <span class="project-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    </span>
    <div class="project-header-text">
      <h3 class="project-title">
        <a href="https://github.com/s3arajgupta/project" target="_blank" rel="noopener noreferrer">Project Title</a>
      </h3>
      <span class="project-stars">&#9733; Open Source</span>
    </div>
  </div>
  <p class="project-summary">
    Short 2-3 sentence overview of what the system does, key technical architecture, and impact.
  </p>
  <div class="project-tags">
    <span class="pill-tag">Python</span>
    <span class="pill-tag">Distributed Systems</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/s3arajgupta/project" target="_blank" rel="noopener noreferrer" class="btn btn-sm">GitHub</a>
  </div>
</div>
```

---

### 3. Updating News / Latest Updates
In [`index.html`](index.html), find `<table class="news-table">` and add a row:

```html
<tr>
  <th scope="row" class="news-date">2026</th>
  <td class="news-content">
    Your milestone, announcement, or paper acceptance here.
  </td>
</tr>
```

---

### 4. Customizing Ctrl + K Quick Search Index
To add custom search results to the search modal, open [`assets/js/script.js`](assets/js/script.js) and update the `searchIndex` array:

```javascript
{
  title: 'Your Topic or Project',
  subtitle: 'Brief description shown in search results',
  url: '#section-id',
  keywords: 'search terms and keywords'
}
```

---

## 🎨 Theme Colors & Customization

Colors are defined using CSS Custom Properties in [`assets/css/style.css`](assets/css/style.css):

- **Light Mode (`:root, [data-theme="light"]`)**:
  - `--bg`: `#ffffff` (Page background)
  - `--accent`: `#0076df` (Link & highlight blue)
  - `--text-primary`: `#212529` (Main body text)
- **Dark Mode (`[data-theme="dark"]`)**:
  - `--bg`: `#121212` (Slate/Charcoal background)
  - `--accent`: `#4daafc` (Soft cyan link color)
  - `--text-primary`: `#f4f4f5` (Light off-white text)

---

## 📄 License

Open-source and free to use.
