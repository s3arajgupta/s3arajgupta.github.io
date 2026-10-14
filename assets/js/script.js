/**
 * al-folio Aesthetic Interactive Engine (Pure Vanilla JavaScript)
 * Powers theme switching, scroll progress, search modal, publication filters, and accordions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Theme Switcher (Light / Dark with System Preference Fallback)
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);

    if (theme === 'dark') {
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Initialize UI based on current attribute
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  }

  // Listen for OS theme preference changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('site-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // =========================================================================
  // 2. Reading Progress Bar
  // =========================================================================
  const progressBar = document.getElementById('reading-progress');
  
  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const percent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${percent}%`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 3. ScrollSpy: Active Section Navigation Highlight
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => navObserver.observe(sec));

  // =========================================================================
  // 4. Mobile Menu Navigation
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // =========================================================================
  // 5. Publications: Expandable Abstract & BibTeX Panels
  // =========================================================================
  document.querySelectorAll('.toggle-abstract, .toggle-bibtex').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (!targetPanel) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        targetPanel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        targetPanel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // One-click BibTeX Copy
  document.querySelectorAll('.copy-bibtex-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bibText = btn.getAttribute('data-clipboard');
      if (navigator.clipboard && bibText) {
        navigator.clipboard.writeText(bibText).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.borderColor = 'var(--accent)';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });

  // =========================================================================
  // 6. Publications: BibSearch Real-time Filter
  // =========================================================================
  const bibsearchInput = document.getElementById('bibsearch-input');
  const pubItems = document.querySelectorAll('.publication-item');

  if (bibsearchInput) {
    bibsearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      pubItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        if (text.includes(query) || keywords.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 7. Ctrl + K Quick Search Modal (<dialog>)
  // =========================================================================
  const searchModal = document.getElementById('search-modal');
  const searchTrigger = document.getElementById('search-trigger');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const modalSearchInput = document.getElementById('modal-search-input');
  const modalSearchResults = document.getElementById('modal-search-results');

  // Search Index Data
  const searchIndex = [
    { title: 'About Swaraj Gupta', subtitle: 'Overview, Bio, and Research Philosophy', url: '#about', keywords: 'ai systems architect bio about' },
    { title: 'Core Focus & Interests', subtitle: 'Multi-Agent Coordination, Distributed Architecture, ML Serving', url: '#about', keywords: 'llm agents distributed systems rag' },
    { title: 'Experience: AI Engineer & Systems Architect', subtitle: 'Autonomous Systems & Intelligent Architecture (2024–Present)', url: '#experience', keywords: 'work experience jobs roles current' },
    { title: 'Experience: Backend Systems & ML Engineer', subtitle: 'Cloud Intelligence & Data Platforms (2022–2024)', url: '#experience', keywords: 'work history fastapi vector dbs' },
    { title: 'Project: AgentMesh Engine', subtitle: 'Resilient multi-agent orchestration framework with parallel tool evaluation', url: '#projects', keywords: 'agentmesh python open source agents orchestration' },
    { title: 'Project: NeuralStream Vector Pipeline', subtitle: 'High-throughput embedding ingestion and semantic ranking engine', url: '#projects', keywords: 'neuralstream vector hnsw embeddings pytorch' },
    { title: 'Project: Distributed Guardrail Proxy', subtitle: 'Deterministic schema compliance and verification for LLM microservices', url: '#projects', keywords: 'guardrails proxy security types' },
    { title: 'Publication: Deterministic Verification in Multi-Agent Systems', subtitle: 'arXiv Preprint (2025)', url: '#publications', keywords: 'paper publication multi-agent verification arxiv' },
    { title: 'Publication: Adaptive Layer Partitioning for Vector Inference', subtitle: 'Technical Report (2024)', url: '#publications', keywords: 'paper publication vector indexing memory' },
    { title: 'Skills: AI & Machine Learning', subtitle: 'Autonomous Agents, LLM Orchestration, RAG, PyTorch', url: '#skills', keywords: 'skills ai ml pytorch huggingface' },
    { title: 'Skills: Systems & Architecture', subtitle: 'Distributed Systems, Microservices, Docker, Kubernetes', url: '#skills', keywords: 'skills systems docker kubernetes architecture' },
    { title: 'Skills: Languages & Databases', subtitle: 'Python, TypeScript, SQL, PostgreSQL, Redis, Linux', url: '#skills', keywords: 'skills python typescript sql postgres redis' },
    { title: 'Contact Information', subtitle: 'Email, GitHub, Location', url: '#contact', keywords: 'email github contact message reach out' }
  ];

  let selectedIndex = 0;

  function renderSearchResults(query = '') {
    if (!modalSearchResults) return;
    const q = query.toLowerCase().trim();
    const filtered = q === '' 
      ? searchIndex.slice(0, 6) 
      : searchIndex.filter(item => 
          item.title.toLowerCase().includes(q) || 
          item.subtitle.toLowerCase().includes(q) || 
          item.keywords.toLowerCase().includes(q)
        );

    modalSearchResults.innerHTML = '';
    selectedIndex = 0;

    if (filtered.length === 0) {
      modalSearchResults.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching items found.</div>';
      return;
    }

    filtered.forEach((item, idx) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = `search-result-item ${idx === 0 ? 'selected' : ''}`;
      a.innerHTML = `
        <span class="search-result-title">${escapeHTML(item.title)}</span>
        <span class="search-result-subtitle">${escapeHTML(item.subtitle)}</span>
      `;
      a.addEventListener('click', () => {
        closeSearch();
      });
      modalSearchResults.appendChild(a);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function openSearch() {
    if (!searchModal) return;
    searchModal.showModal();
    if (modalSearchInput) {
      modalSearchInput.value = '';
      renderSearchResults();
      setTimeout(() => modalSearchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.close();
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', openSearch);
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', closeSearch);
  }

  // Close when clicking dialog backdrop (light dismiss)
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      const dialogRect = searchModal.getBoundingClientRect();
      const isInDialog = (
        dialogRect.top <= e.clientY && e.clientY <= dialogRect.top + dialogRect.height &&
        dialogRect.left <= e.clientX && e.clientX <= dialogRect.left + dialogRect.width
      );
      if (!isInDialog) {
        closeSearch();
      }
    });

    if (modalSearchInput) {
      modalSearchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });

      modalSearchInput.addEventListener('keydown', (e) => {
        const items = modalSearchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % items.length;
          updateItemSelection(items);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          updateItemSelection(items);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (items[selectedIndex]) {
            items[selectedIndex].click();
          }
        }
      });
    }
  }

  function updateItemSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // Global Ctrl + K / Cmd + K Shortcut Listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.open) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

});
