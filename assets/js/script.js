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

  // Search Index Data (Accurately indexed from GitHub and LinkedIn profile)
  const searchIndex = [
    { title: 'About Swaraj Gupta', subtitle: 'AI Engineer & Distributed Systems Architect | NUS-ISS & Ex-Ericsson', url: '#about', keywords: 'swaraj gupta bio about nus iss ericsson ai systems architect' },
    { title: 'Core Focus & Interests', subtitle: 'Agentic AI, Cloud-Native Big Data, MLOps & Explainable AI', url: '#about', keywords: 'agentic reasoning llm mlops kubernetes spark xai dsp' },
    { title: 'Experience: NUS-ISS (MTech AIS)', subtitle: 'Graduate Student in Artificial Intelligence Systems (2026–Present)', url: '#experience', keywords: 'nus iss singapore master ai artificial intelligence systems' },
    { title: 'Experience: Ericsson', subtitle: 'Senior Data & Machine Learning Engineer — Big Data & MLOps (2022–2026)', url: '#experience', keywords: 'ericsson work experience jobs big data pyspark kubernetes mlops' },
    { title: 'Experience: Samsung R&D Institute', subtitle: 'Deep Learning Research Intern — PRISM 1st Place Winner (2022)', url: '#experience', keywords: 'samsung prism hackathon winner deep learning speech audio keyword' },
    { title: 'Experience: ÉTS Montréal', subtitle: 'Mitacs Globalink Research Intern in Data Science (2021)', url: '#experience', keywords: 'mitacs globalink ets montreal canada research intern software analytics' },
    { title: 'Project: MLTracker Engine', subtitle: 'Enterprise MLOps experiment tracking and model governance platform', url: '#projects', keywords: 'mltracker mlflow python model registry experiment tracking champion challenger' },
    { title: 'Project: VoxEmotion Intelligence', subtitle: 'Speech DSP & acoustic ML extracting 180D features for emotion classification', url: '#projects', keywords: 'voxemotion audio dsp librosa mfcc pytorch speech emotion' },
    { title: 'Project: InterpretAI Suite', subtitle: 'Explainable AI platform with SHAP waterfall & algorithmic fairness auditing', url: '#projects', keywords: 'interpretai xai shap explainability fairness disparate impact' },
    { title: 'Project: Vision-Language Captioning', subtitle: 'Encoder-decoder CNN-RNN neural network for automated image descriptions', url: '#projects', keywords: 'image captioning vision language cnn rnn multimodal pytorch' },
    { title: 'Research: MLTracker Governance', subtitle: 'Cloud-Native MLOps Technical Report (2025)', url: '#research', keywords: 'research mltracker governance mlops model registry' },
    { title: 'Research: Speech Emotion DSP', subtitle: 'Acoustic Deep Learning & Signal Processing Report (2024)', url: '#research', keywords: 'research acoustic prosody dsp speech emotion librosa' },
    { title: 'Research: Samsung PRISM Award Winner', subtitle: 'Acoustic Deep Learning for Spoken Name Recognition (1st / 200+ teams)', url: '#research', keywords: 'research samsung prism award name calling audio deep learning' },
    { title: 'Certification: CKAD (CNCF)', subtitle: 'Certified Kubernetes Application Developer (Valid 2024–2027)', url: '#skills', keywords: 'ckad certified kubernetes application developer cncf linux foundation' },
    { title: 'Skills: AI, ML & MLOps', subtitle: 'Autonomous Agents, PyTorch, MLflow, Audio DSP, SHAP', url: '#skills', keywords: 'skills ai ml pytorch mlops mlflow librosa shap' },
    { title: 'Skills: Cloud-Native & Systems', subtitle: 'Kubernetes (CKAD), Docker, Apache PySpark, Microservices, HLD', url: '#skills', keywords: 'skills kubernetes docker pyspark microservices distributed systems' },
    { title: 'Contact Information', subtitle: 'Singapore, Email, LinkedIn, GitHub, LeetCode', url: '#contact', keywords: 'contact email linkedin github leetcode singapore reach out' }
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
