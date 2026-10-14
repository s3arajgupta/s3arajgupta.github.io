# Swaraj Gupta — Portfolio & Research Website

A clean, minimalist personal website for an **AI Engineer & Systems Architect** in **pure, zero-dependency Vanilla HTML, CSS, and JavaScript**.

🌐 **Live Website**: [s3arajgupta.github.io](https://s3arajgupta.github.io/)

---

## ✨ Features & Architecture

- **Zero Build Steps & Zero Dependencies**: Runs directly in any browser with instant GitHub Pages deployment (no Ruby, Jekyll, npm, or bundlers required).
- **Clean Academic Layout**:
  - Two-column asymmetric hero on the *About* page with floating profile card, contact details, and social icon dock.
  - Interactive **News / Latest Updates** timeline table.
  - Signature **Publications & Technical Papers** section with conference badges (`ICLR`, `ARXIV`, `SYS`), expandable `Abs` abstract panels, and expandable `BibTeX` citations with a **one-click copy button**.
  - Real-time **BibSearch filter** to search publications by keyword on the fly.
  - Project repository showcase cards with technology tags.
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
├── index.html              # Main page markup with semantic sections & search dialog
├── favicon.svg             # Scalable SVG favicon
├── assets/
│   ├── css/
│   │   └── style.css       # Design tokens, typography, dark/light themes & print rules
│   ├── js/
│   │   └── script.js       # Search modal engine, theme switcher, and accordions
│   └── img/
│       └── profile.svg     # Default avatar asset (or your personal photo)
└── README.md               # Project documentation and editing guide
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

### 1. Changing Your Profile Photo
1. Place your image (e.g., `profile.jpg`) inside the `assets/img/` folder.
2. In [`index.html`](index.html), locate `#profile-img` around line 170 and update the `src`:
   ```html
   <img id="profile-img" src="assets/img/profile.jpg" alt="Swaraj Gupta" class="profile-img">
   ```

---

### 2. Adding a New Publication / Paper
Find `<div class="publications-list">` in [`index.html`](index.html) and copy-paste this block:

```html
<article class="publication-item" data-keywords="agents reasoning orchestration iclr 2025">
  <div class="pub-badge-col">
    <span class="venue-badge">ICLR</span>
  </div>
  <div class="pub-details-col">
    <h4 class="pub-title">
      Your Paper or Architecture Title
    </h4>
    <div class="pub-authors">
      <strong>Swaraj Gupta</strong>, and Co-Author Name
    </div>
    <div class="pub-periodical">
      <em>Conference Name / Journal</em>, 2025
    </div>

    <!-- Action Buttons -->
    <div class="pub-links">
      <button class="pub-btn toggle-abstract" aria-expanded="false" data-target="abs-new">Abs</button>
      <a href="https://arxiv.org/abs/..." target="_blank" rel="noopener noreferrer" class="pub-btn">PDF</a>
      <a href="https://github.com/s3arajgupta/repo" target="_blank" rel="noopener noreferrer" class="pub-btn">Code</a>
      <button class="pub-btn toggle-bibtex" aria-expanded="false" data-target="bib-new">BibTeX</button>
    </div>

    <!-- Abstract Panel -->
    <div id="abs-new" class="pub-collapsible pub-abstract-panel" hidden>
      <p>
        Your paper abstract goes here. Describe the core methodology, benchmark results, and engineering implications.
      </p>
    </div>

    <!-- BibTeX Panel -->
    <div id="bib-new" class="pub-collapsible pub-bibtex-panel" hidden>
      <div class="bibtex-header">
        <span>BibTeX</span>
        <button class="copy-bibtex-btn" data-clipboard="@article{gupta2025title,
  title={Your Paper Title},
  author={Gupta, Swaraj},
  journal={Conference},
  year={2025}
}">Copy</button>
      </div>
      <pre class="bibtex-code"><code>@article{gupta2025title,
  title={Your Paper Title},
  author={Gupta, Swaraj},
  journal={Conference},
  year={2025}
}</code></pre>
    </div>

  </div>
</article>
```
*Note: Ensure the `data-target` on the buttons matches the `id` of the collapsible panels (`abs-new` and `bib-new`).*

---

### 3. Adding a Featured Project
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

### 4. Updating News / Latest Updates
In [`index.html`](index.html), find `<table class="news-table">` and add a row:

```html
<tr>
  <th scope="row" class="news-date">2025</th>
  <td class="news-content">
    Your milestone, announcement, or paper acceptance here.
  </td>
</tr>
```

---

### 5. Customizing Ctrl + K Quick Search Index
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
