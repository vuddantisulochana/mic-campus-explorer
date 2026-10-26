// Admin Management Service for MIC Campus Explorer
class AdminService {
  constructor() {
    this.adminKey = localStorage.getItem('mic_admin_key') || '';
    this.modal = document.getElementById('admin-modal');
    this.openBtn = document.getElementById('btn-open-admin');
    this.closeBtn = document.getElementById('btn-close-admin');
    this.authForm = document.getElementById('admin-auth-form');
    this.portalBody = document.getElementById('admin-portal-body');
    this.authSection = document.getElementById('admin-auth-section');

    this.bindEvents();
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.openAdminModal());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        if (this.modal) this.modal.classList.remove('show');
      });
    }

    if (this.authForm) {
      this.authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyInput = document.getElementById('admin-key-input');
        if (keyInput) {
          this.verifyKey(keyInput.value);
        }
      });
    }

    // New Announcement Form
    const annForm = document.getElementById('form-add-announcement');
    if (annForm) {
      annForm.addEventListener('submit', (e) => this.submitAnnouncement(e));
    }

    // Custom Database Import Handler (Rooms & Contacts)
    const importBtn = document.getElementById('btn-import-db-data');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.handleDatabaseImport());
    }
  }

  openAdminModal() {
    if (this.modal) this.modal.classList.add('show');
    if (this.adminKey === 'mictech2026') {
      this.showPortal();
    } else {
      this.showAuth();
    }
  }

  showAuth() {
    if (this.authSection) this.authSection.style.display = 'block';
    if (this.portalBody) this.portalBody.style.display = 'none';
  }

  showPortal() {
    if (this.authSection) this.authSection.style.display = 'none';
    if (this.portalBody) this.portalBody.style.display = 'block';
  }

  async verifyKey(key) {
    if (key.trim() === 'mictech2026') {
      this.adminKey = 'mictech2026';
      localStorage.setItem('mic_admin_key', 'mictech2026');
      this.showPortal();
      if (window.App) window.App.showToast('Admin Authenticated Successfully!', 'success');
    } else {
      if (window.App) window.App.showToast('Invalid Admin Passcode. Access Denied.', 'danger');
    }
  }

  async handleDatabaseImport() {
    const jsonInput = document.getElementById('db-import-json');
    if (!jsonInput || !jsonInput.value.trim()) {
      if (window.App) window.App.showToast('Please paste valid JSON containing "rooms" or "contacts" arrays.', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput.value.trim());
      const payload = {};
      if (parsed.rooms) payload.rooms = parsed.rooms;
      if (parsed.contacts) payload.contacts = parsed.contacts;

      if (!payload.rooms && !payload.contacts) {
        throw new Error('JSON must contain "rooms" or "contacts" arrays.');
      }

      const res = await fetch('/api/admin/import-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': this.adminKey
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Import failed');

      if (window.App) {
        window.App.showToast(`Import Success: ${data.message}`, 'success');
        window.App.loadAllData();
      }
      jsonInput.value = '';
    } catch (err) {
      if (window.App) window.App.showToast(`Import Error: ${err.message}`, 'danger');
    }
  }

  async submitAnnouncement(e) {
    e.preventDefault();
    const title = document.getElementById('ann-title-input').value;
    const category = document.getElementById('ann-category-input').value;
    const content = document.getElementById('ann-content-input').value;
    const priority = document.getElementById('ann-priority-input').value;

    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': this.adminKey
        },
        body: JSON.stringify({ title, category, content, priority })
      });

      if (!res.ok) throw new Error('Failed to create announcement');

      if (window.App) {
        window.App.showToast('Announcement posted successfully!', 'success');
        window.App.loadAllData();
      }
      e.target.reset();
    } catch (err) {
      if (window.App) window.App.showToast(err.message, 'danger');
    }
  }
}

window.AdminService = AdminService;
