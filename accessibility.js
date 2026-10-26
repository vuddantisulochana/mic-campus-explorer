// Accessibility & Customization Manager for MIC Campus Explorer
class AccessibilityManager {
  constructor() {
    this.fontScale = parseFloat(localStorage.getItem('mic_font_scale')) || 1.0;
    this.isHighContrast = localStorage.getItem('mic_high_contrast') === 'true';
    this.theme = localStorage.getItem('mic_theme') || 'dark';

    this.drawer = document.getElementById('accessibility-drawer');
    this.openBtn = document.getElementById('btn-open-a11y');
    this.closeBtn = document.getElementById('btn-close-a11y');
    this.themeToggleBtn = document.getElementById('btn-theme-toggle');

    this.init();
  }

  init() {
    this.applySettings();
    this.bindEvents();
  }

  applySettings() {
    // Font Scale
    document.documentElement.style.setProperty('--font-scale', this.fontScale);

    // High Contrast
    if (this.isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Theme (Dark / Light)
    if (this.theme === 'light') {
      document.body.classList.add('light-theme');
      if (this.themeToggleBtn) this.themeToggleBtn.innerHTML = '🌙';
    } else {
      document.body.classList.remove('light-theme');
      if (this.themeToggleBtn) this.themeToggleBtn.innerHTML = '☀️';
    }
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => {
        if (this.drawer) this.drawer.classList.add('open');
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        if (this.drawer) this.drawer.classList.remove('open');
      });
    }

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // A11y Drawer Controls
    const fontIncBtn = document.getElementById('btn-font-increase');
    const fontDecBtn = document.getElementById('btn-font-decrease');
    const fontResetBtn = document.getElementById('btn-font-reset');
    const contrastToggle = document.getElementById('toggle-high-contrast');

    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', () => {
        this.fontScale = Math.min(1.4, this.fontScale + 0.1);
        localStorage.setItem('mic_font_scale', this.fontScale);
        this.applySettings();
      });
    }

    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', () => {
        this.fontScale = Math.max(0.85, this.fontScale - 0.1);
        localStorage.setItem('mic_font_scale', this.fontScale);
        this.applySettings();
      });
    }

    if (fontResetBtn) {
      fontResetBtn.addEventListener('click', () => {
        this.fontScale = 1.0;
        localStorage.setItem('mic_font_scale', 1.0);
        this.applySettings();
      });
    }

    if (contrastToggle) {
      contrastToggle.checked = this.isHighContrast;
      contrastToggle.addEventListener('change', (e) => {
        this.isHighContrast = e.target.checked;
        localStorage.setItem('mic_high_contrast', this.isHighContrast);
        this.applySettings();
      });
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mic_theme', this.theme);
    this.applySettings();
    if (window.App) {
      window.App.showToast(`Switched to ${this.theme.toUpperCase()} mode`, 'info');
    }
  }
}

window.AccessibilityManager = AccessibilityManager;
