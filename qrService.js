// QR Code Scanner and Indoor Positioning System for MIC Campus Explorer
class QRScannerService {
  constructor() {
    this.videoStream = null;
    this.videoElement = document.getElementById('qr-video-element');
    this.modal = document.getElementById('qr-modal');
    this.openBtn = document.getElementById('btn-scan-qr');
    this.closeBtn = document.getElementById('btn-close-qr-modal');
    this.resultContainer = document.getElementById('qr-result-box');
    this.isScanning = false;
    this.scanInterval = null;

    this.bindEvents();
    this.renderSimulatorChips();
  }

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.openScanner());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeScanner());
    }

    // Direct QR scanning button on search bar
    const searchQRBtn = document.getElementById('search-btn-qr');
    if (searchQRBtn) {
      searchQRBtn.addEventListener('click', () => this.openScanner());
    }
  }

  async openScanner() {
    if (this.modal) this.modal.classList.add('show');
    this.isScanning = true;

    // Reset result state
    if (this.resultContainer) this.resultContainer.innerHTML = '';

    // Attempt Camera Stream
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (this.videoElement) {
          this.videoElement.srcObject = this.videoStream;
          this.videoElement.play();
        }
      }
    } catch (err) {
      console.warn('Camera access unavailable or permission denied:', err);
      if (window.App) window.App.showToast('Camera feed unavailable. You can click any QR code chip below to simulate scanning.', 'info');
    }
  }

  closeScanner() {
    this.isScanning = false;
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
    if (this.modal) this.modal.classList.remove('show');
  }

  // Handle detected or simulated QR code
  async processQRCode(rawCode) {
    const code = rawCode.trim().toUpperCase();
    if (window.App) window.App.showToast(`Analyzing QR Code: "${code}"...`, 'info');

    try {
      const locData = await API.getQRLocation(code);

      // Render Detected Location Card in modal
      if (this.resultContainer) {
        this.resultContainer.innerHTML = `
          <div style="background:linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(14, 165, 233, 0.2)); border:1px solid rgba(16, 185, 129, 0.4); border-radius:12px; padding:1rem; margin-top:1rem; text-align:left;">
            <div style="font-size:0.75rem; color:#34d399; font-weight:bold; text-transform:uppercase;">📍 You Are Here:</div>
            <div style="font-size:1.15rem; font-weight:800; color:#ffffff; margin:0.25rem 0;">${locData.location_name}</div>
            <div style="font-size:0.85rem; color:#cbd5e1;">${locData.building_name} ${locData.floor_name ? `• ${locData.floor_name}` : ''}</div>
            <div style="margin-top:0.75rem; display:flex; gap:0.5rem;">
              <button class="btn btn-accent btn-mini" id="qr-start-nav-btn" style="flex:1">🧭 Set As Origin & Navigate</button>
              <button class="btn btn-primary btn-mini" id="qr-view-map-btn" style="flex:1">🗺️ View On Map</button>
            </div>
          </div>
        `;

        document.getElementById('qr-start-nav-btn')?.addEventListener('click', () => {
          this.closeScanner();
          if (window.NavManager) {
            window.NavManager.setOriginFromQR(locData.node_id);
          }
          if (window.App) window.App.switchView('map');
          window.App.showToast(`Starting navigation from ${locData.location_name}`, 'success');
        });

        document.getElementById('qr-view-map-btn')?.addEventListener('click', () => {
          this.closeScanner();
          if (window.CampusMap) {
            window.CampusMap.panToCoordinate(locData.coordinates.x, locData.coordinates.y, 1.6);
            window.CampusMap.setGPSLocation(locData.node_id);
          }
          if (window.App) window.App.switchView('map');
        });
      }

      // Voice confirmation
      if (window.VoiceService) {
        window.VoiceService.speak(`Location identified: ${locData.location_name}`);
      }

    } catch (err) {
      if (this.resultContainer) {
        this.resultContainer.innerHTML = `
          <div style="background:rgba(239, 68, 68, 0.15); border:1px solid #ef4444; border-radius:12px; padding:0.85rem; margin-top:1rem; color:#fca5a5; font-size:0.85rem;">
            ⚠️ ${err.message}
          </div>
        `;
      }
    }
  }

  // Render Interactive QR Test Simulator Deck
  renderSimulatorChips() {
    const chipsContainer = document.getElementById('qr-simulator-chips');
    if (!chipsContainer) return;

    const sampleQRs = [
      { code: 'MICLOC-GATE', label: '🚪 Main Gate' },
      { code: 'MICLOC-MACB-GF', label: '🏛️ Main Block Porch' },
      { code: 'MICLOC-CSE-GF', label: '💻 CSE Dept (GF)' },
      { code: 'MICLOC-MECH-GF', label: '⚙️ Mechanical (GF)' },
      { code: 'MICLOC-IT-GF', label: '🌐 IT Dept (GF)' },
      { code: 'MICLOC-ADMIN-FF', label: '🏛️ Admin Office (1st Fl)' },
      { code: 'MICLOC-LIB-FF', label: '📚 Central Library (1st Fl)' },
      { code: 'MICLOC-AI-FF', label: '🤖 AI & DS Dept (1st Fl)' },
      { code: 'MICLOC-EEE-FF', label: '⚡ EEE Dept (1st Fl)' },
      { code: 'MICLOC-EXAM-FF', label: '📋 Exam Cell (1st Fl)' },
      { code: 'MICLOC-TNP-FF', label: '💼 T & P Cell (1st Fl)' },
      { code: 'MICLOC-ECE-SF', label: '📡 ECE Dept (2nd Fl)' },
      { code: 'MICLOC-CIVIL-SF', label: '🏗️ Civil Dept (2nd Fl)' },
      { code: 'MICLOC-BED', label: '🎓 B.Ed Block' },
      { code: 'MICLOC-CANTEEN', label: '☕ Canteen' },
      { code: 'MICLOC-HOSTEL-B', label: '🏢 Boys Hostel' },
      { code: 'MICLOC-HOSTEL-G', label: '🏡 Girls Hostel' }
    ];

    chipsContainer.innerHTML = '';
    sampleQRs.forEach(item => {
      const chip = document.createElement('button');
      chip.className = 'sim-chip';
      chip.textContent = item.label;
      chip.title = `Simulate scan: ${item.code}`;
      chip.addEventListener('click', () => {
        this.processQRCode(item.code);
      });
      chipsContainer.appendChild(chip);
    });
  }
}

window.QRScannerService = QRScannerService;
