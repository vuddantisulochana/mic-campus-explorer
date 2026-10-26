// Main Application Controller for MIC CAMPUS EXPLORER
class CampusApp {
  constructor() {
    this.currentView = 'dashboard';
    this.buildings = [];
    this.departments = [];
    this.floors = [];
    this.rooms = [];
    this.facilities = [];
    this.announcements = [];
    this.recentSearches = JSON.parse(localStorage.getItem('mic_recent_searches')) || [];
    this.favorites = JSON.parse(localStorage.getItem('mic_favorites')) || [];

    this.init();
  }

  async init() {
    console.log('[App] Initializing MIC Campus Explorer...');

    // 1. Initialize Sub-services
    window.CampusMap = new CampusMapEngine('campus-map-viewport');
    window.NavManager = new NavigationManager(window.CampusMap);
    window.VoiceService = new VoiceService();
    window.QRScanner = new QRScannerService();
    window.GoogleMaps = new GoogleMapsService();
    window.A11y = new AccessibilityManager();
    window.Admin = new AdminService();

    // 2. Load Core Data
    await this.loadAllData();

    // 3. Bind UI Events
    this.bindNavigation();
    this.bindSearch();
    this.bindFloorExplorer();
    this.bindBuildingSelectionEvent();

    // 4. Animate Stats Counters
    this.animateStatCounters();

    console.log('[App] MIC Campus Explorer fully initialized.');
  }

  async loadAllData() {
    try {
      const [stats, bldgs, depts, flrs, rms, facs, anns] = await Promise.all([
        API.getStats(),
        API.getBuildings(),
        API.getDepartments(),
        API.getFloors(),
        API.getRooms(),
        API.getFacilities(),
        API.getAnnouncements()
      ]);

      this.buildings = bldgs;
      this.departments = depts;
      this.floors = flrs;
      this.rooms = rms;
      this.facilities = facs;
      this.announcements = anns;

      // Pass buildings to Map Engine
      window.CampusMap.loadBuildings(bldgs);

      // Render Modules
      this.renderBuildingCards();
      this.renderFacilities();
      this.renderAnnouncements();
      this.renderExplorerBlocks();
      this.renderContacts();

    } catch (err) {
      console.error('[App] Data loading error:', err);
      this.showToast('Error loading campus data from server.', 'danger');
    }
  }

  // View Navigation (Dashboard, Map, Explorer, Facilities, Directory)
  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.style.display = 'none';
    });

    const targetSection = document.getElementById(`section-${viewName}`);
    if (targetSection) {
      targetSection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav buttons
    document.querySelectorAll('.nav-item-btn, .mobile-nav-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Special trigger for map view
    if (viewName === 'map' && window.CampusMap) {
      setTimeout(() => {
        window.CampusMap.updateTransform();
      }, 100);
    }
  }

  bindNavigation() {
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView(btn.dataset.view);
      });
    });

    // Map layer filter chips
    document.querySelectorAll('.layer-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.layer-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const layer = chip.dataset.layer;
        window.CampusMap.setLayerFilter(layer);
      });
    });

    // Map dual-view toggle
    const vectorBtn = document.getElementById('btn-view-vector-map');
    const googleBtn = document.getElementById('btn-view-google-map');
    const vectorCanvas = document.getElementById('campus-map-viewport');
    const googleView = document.getElementById('google-maps-view');

    if (vectorBtn && googleBtn) {
      vectorBtn.addEventListener('click', () => {
        vectorBtn.classList.add('active');
        googleBtn.classList.remove('active');
        vectorCanvas.style.display = 'block';
        googleView.style.display = 'none';
      });

      googleBtn.addEventListener('click', () => {
        googleBtn.classList.add('active');
        vectorBtn.classList.remove('active');
        vectorCanvas.style.display = 'none';
        googleView.style.display = 'block';
        window.GoogleMaps.renderGoogleMapEmbed();
      });
    }

    // Quick Action Chips in Hero
    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        if (query) {
          const searchInput = document.getElementById('smart-search-input');
          if (searchInput) searchInput.value = query;
          this.executeSearch(query);
        }
      });
    });
  }

  // Smart Search Implementation
  bindSearch() {
    const searchInput = document.getElementById('smart-search-input');
    const dropdown = document.getElementById('search-results-dropdown');
    let debounceTimer;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        if (query.length < 2) {
          if (dropdown) dropdown.classList.remove('show');
          return;
        }

        debounceTimer = setTimeout(async () => {
          await this.executeSearch(query);
        }, 250);
      });

      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
          if (dropdown) dropdown.classList.add('show');
        }
      });

      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
          if (dropdown) dropdown.classList.remove('show');
        }
      });
    }

    // Category filter pills
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const q = searchInput ? searchInput.value.trim() : '';
        if (q.length >= 2) {
          this.executeSearch(q, pill.dataset.cat);
        }
      });
    });
  }

  async executeSearch(query, category = 'all') {
    const dropdown = document.getElementById('search-results-dropdown');
    if (!dropdown) return;

    try {
      const data = await API.search(query, category);
      if (!data.results || data.results.length === 0) {
        dropdown.innerHTML = `
          <div style="padding:1.5rem; text-align:center; color:var(--text-muted);">
            <div>🔍 No campus locations found matching "<strong>${query}</strong>"</div>
            <div style="font-size:0.8rem; margin-top:0.35rem;">Try searching: "CSE", "Library", "1108", "Canteen", "Hostel", "Gate"</div>
          </div>
        `;
        dropdown.classList.add('show');
        return;
      }

      dropdown.innerHTML = '';
      data.results.forEach(item => {
        const row = document.createElement('div');
        row.className = 'search-result-item';

        const icon = this.iconSvgForName(item.name || item.room_number || item.entity_type);
        const sub = item.building_name ? `${item.building_name} ${item.floor_name ? `• ${item.floor_name}` : ''}` : item.type || item.category || 'MIC Campus';

        row.innerHTML = `
          <div class="result-info">
            <div class="result-icon">${icon}</div>
            <div>
              <div class="result-title">${item.name || item.room_number}</div>
              <div class="result-sub">${sub}</div>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn-mini btn-mini-primary" data-action="view">${this.iconSvgForName('map')} Map</button>
            <button class="btn-mini btn-mini-accent" data-action="nav">${this.iconSvgForName('compass')} Navigate</button>
          </div>
        `;

        row.querySelector('[data-action="view"]')?.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.remove('show');
          this.focusItemOnMap(item);
        });

        row.querySelector('[data-action="nav"]')?.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.remove('show');
          this.navigateToItem(item);
        });

        row.addEventListener('click', () => {
          dropdown.classList.remove('show');
          if (item.entity_type === 'room' || item.room_number || item.room_no) {
            this.openSearchedRoom(item);
          } else {
            this.focusItemOnMap(item);
          }
        });

        dropdown.appendChild(row);
      });

      dropdown.classList.add('show');

    } catch (err) {
      console.error('Search error:', err);
    }
  }

  focusItemOnMap(item) {
    this.switchView('map');
    if (item.building_id && window.CampusMap) {
      window.CampusMap.selectBuilding(item.building_id);
    } else if (item.id && window.CampusMap) {
      window.CampusMap.selectBuilding(item.id);
    }
  }

  navigateToItem(item) {
    const isRoom = item && (item.entity_type === 'room' || item.room_number || item.room_no || item.room_number === 0);
    const targetBuildingId = String((item && (item.building_id || item.id)) || '');

    // Resolve search results to an explicit navigation node here, before the
    // event is dispatched. This prevents stale/default Main Block destinations.
    const entranceByBuilding = {
      'bldg-gate': 'node-gate',
      'bldg-macb': 'node-macb-entrance',
      'bldg-dip1': 'node-dip-conn',
      'bldg-dip2': 'node-dip2-entrance',
      'bldg-bed': 'node-bed',
      'bldg-labs': 'node-labs',
      'bldg-gh': 'node-gh',
      'bldg-bh': 'node-bh',
      'bldg-gym': 'node-gym',
      'bldg-canteen': 'node-canteen',
      'bldg-auditorium': 'node-auditorium',
      'bldg-cafe': 'node-cafe',
      'bldg-busbay': 'node-busbay',
      'bldg-ground': 'node-ground',
      'bldg-parking1': 'node-parking1-mid',
      'bldg-parking2': 'node-east-road-north'
    };

    // Keep the existing map navigation and show the selected classroom details
    // on the same page when the search result is a room.
    if (isRoom) this.showSearchedRoomMapCard(item);

    window.dispatchEvent(new CustomEvent('campus:navigateTowards', {
      detail: {
        targetNodeId: entranceByBuilding[targetBuildingId] || null,
        targetBuildingId,
        targetFloorId: item.floor_id || null,
        targetEntityType: item.entity_type || (isRoom ? 'room' : null),
        targetLabel: item.room_number || item.name || item.label || null
      }
    }));
  }

  openSearchedRoom(searchItem) {
    const room = (this.rooms || []).find(r =>
      String(r.id) === String(searchItem.id) ||
      String(r.room_number || r.room_no || r.number || '') ===
        String(searchItem.room_number || searchItem.room_no || searchItem.number || searchItem.name || '')
    );

    if (!room) {
      this.showToast(`Room ${searchItem.room_number || searchItem.name || ''} details are not available in the room directory.`, 'warning');
      return;
    }

    const buildingId = room.building_id || searchItem.building_id;
    const floorId = room.floor_id || searchItem.floor_id;
    this.switchView('explorer');

    if (buildingId) this.openExplorerBuilding(buildingId);
    if (buildingId && floorId) this.openExplorerFloor(buildingId, floorId);

    this.explorerCurrentRooms = (this.rooms || []).filter(r =>
      String(r.building_id) === String(buildingId) && String(r.floor_id) === String(floorId)
    );
    this.openExplorerRoom(room);
  }

  showSearchedRoomMapCard(searchItem) {
    const room = (this.rooms || []).find(r =>
      String(r.id) === String(searchItem.id) ||
      String(r.room_number || r.room_no || r.number || '') ===
        String(searchItem.room_number || searchItem.room_no || searchItem.number || searchItem.name || '')
    ) || searchItem;

    const buildingId = room.building_id || searchItem.building_id;
    const floorId = room.floor_id || searchItem.floor_id;
    const building = (this.buildings || []).find(b => String(b.id) === String(buildingId));
    const floor = (this.floors || []).find(f => String(f.id) === String(floorId));
    let card = document.getElementById('searched-room-map-details');

    if (!card) {
      card = document.createElement('section');
      card.id = 'searched-room-map-details';
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-label', 'Selected classroom details');
      card.style.cssText = 'position:fixed;right:22px;bottom:22px;z-index:10000;width:min(360px,calc(100vw - 32px));max-height:55vh;overflow:auto;background:var(--card-bg,#fff);color:var(--text-color,#172033);border:1px solid rgba(100,116,139,.35);border-radius:16px;padding:18px;box-shadow:0 12px 36px rgba(15,23,42,.25);';
      document.body.appendChild(card);
    }

    const safe = value => this.escapeExplorerHtml(String(value ?? '—'));
    const roomNumber = room.room_number || room.room_no || room.number ||
      searchItem.room_number || searchItem.room_no || searchItem.number || searchItem.name || 'Classroom';
    const department = room.department_name || searchItem.department_name ||
      (room.department_id ? String(room.department_id) : '');
    const rows = [
      ['Room Number', roomNumber],
      ['Building', building?.name || room.building_name || searchItem.building_name],
      ['Floor', floor?.floor_name || floor?.name || room.floor_name || searchItem.floor_name],
      ['Room Type', room.type || room.room_type || searchItem.type],
      ['Department', department]
    ].filter(([, value]) => value && value !== '—');

    card.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;">
        <div><div style="font-size:12px;opacity:.7;">SELECTED CLASSROOM</div><h3 style="margin:4px 0 0;font-size:20px;">${safe(roomNumber)}</h3></div>
        <button type="button" id="close-searched-room-map-details" aria-label="Close room details" style="border:0;border-radius:8px;padding:7px 10px;cursor:pointer;">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:10px;">
        ${rows.map(([label, value]) => `<div style="padding:9px 11px;background:rgba(148,163,184,.12);border-radius:9px;"><div style="font-size:11px;opacity:.7;margin-bottom:3px;">${safe(label)}</div><strong>${safe(value)}</strong></div>`).join('')}
      </div>
      <div style="font-size:12px;opacity:.75;margin-top:12px;">The campus route is shown on the map. Room details are for the selected classroom.</div>
    `;
    card.querySelector('#close-searched-room-map-details')?.addEventListener('click', () => card.remove());
  }

  // Consistent SVG icons for Home, search results, building cards and the explorer.
  iconSvgForName(value) {
    const name = String(value || '').toLowerCase();
    const paths = {
      cafeteria: '<path d="M3 3h18v18H3zM7 7h10M7 11h10M7 15h6"/>',
      cricket: '<circle cx="12" cy="12" r="9"/><path d="M6 6l12 12M18 6 6 18"/>',
      playground: '<path d="M3 21V9l9-6 9 6v12M7 21v-7h10v7M2 21h20"/>',
      bus: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 19v2M17 19v2M7 15h.01M17 15h.01M7 5V3h10v2"/>',
      sports: '<circle cx="12" cy="12" r="9"/><path d="m12 3 3 6-3 4-3-4 3-6M3 12h6l3 9 3-9h6"/>',
      playground: '<path d="M3 21V9l9-6 9 6v12M7 21v-7h10v7M2 21h20"/><circle cx="12" cy="8" r="1"/>',
      food: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3v18M17 3c3 2 4 6 0 9"/>',
      cafeteria: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3v18M17 3c3 2 4 6 0 9"/>',
      library: '<path d="M4 4h16v17H4zM8 4v17M12 8h5M12 12h5M12 16h5"/>',
      computer: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
      office: '<path d="M4 21V5l8-3 8 3v16M4 9h16M8 9v12M16 9v12M2 21h20"/>',
      exam: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8 9 2 2 4-4M8 15h8"/>',
      placement: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
      hostel: '<path d="M3 21V4h18v17M7 8h3M14 8h3M7 12h3M14 12h3M10 21v-4h4v4"/>',
      gate: '<path d="M3 21V5l9-3 9 3v16M3 9h18M8 9v12M16 9v12M1 21h22"/>',
      parking: '<path d="M5 21V3h8a5 5 0 0 1 0 10H5M5 13h8"/>',
      gym: '<path d="M2 9v6M5 6v12M19 6v12M22 9v6M5 12h14"/>',
      building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
      pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 5-4.8 2 2-4.8z"/>'
    };
    let key = 'building';
    if (/bus|terminal|transport/.test(name)) key = 'bus';
    else if (/play.?ground|sports ground|cricket|arena|athletics|sports/.test(name)) key = 'sports';
    else if (/cafeteria|canteen|dining|food|refreshment/.test(name)) key = 'food';
    else if (/library|book/.test(name)) key = 'library';
    else if (/cse|computer|department|lab|workshop/.test(name)) key = 'computer';
    else if (/principal|admin|office|academic/.test(name)) key = 'office';
    else if (/exam/.test(name)) key = 'exam';
    else if (/placement|training/.test(name)) key = 'placement';
    else if (/hostel/.test(name)) key = 'hostel';
    else if (/gate|security/.test(name)) key = 'gate';
    else if (/parking/.test(name)) key = 'parking';
    else if (/gym|fitness/.test(name)) key = 'gym';
    return `<svg class="facility-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[key]}</svg>`;
  }

  // Building Explorer Cards Render
  renderBuildingCards() {
    const grid = document.getElementById('buildings-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';
    this.buildings.forEach(bldg => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-top">
          <div class="card-icon">${this.iconSvgForName(bldg.name || bldg.type)}</div>
          <span class="card-tag">${bldg.type}</span>
        </div>
        <div class="card-title">${bldg.name}</div>
        <div class="card-description">${bldg.description}</div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem;">
          📊 <strong>${bldg.floors_count}</strong> ${bldg.floors_count > 1 ? 'Floors' : 'Floor'} • Verified Campus Block
        </div>
        <div class="card-actions">
          <button class="btn btn-outline" data-bldg-id="${bldg.id}" data-action="explore">Explore Floors</button>
          <button class="btn btn-primary" data-bldg-id="${bldg.id}" data-action="navigate">Navigate</button>
        </div>
      `;

      card.querySelector('[data-action="explore"]')?.addEventListener('click', () => {
        this.openFloorExplorerForBuilding(bldg.id);
      });

      card.querySelector('[data-action="navigate"]')?.addEventListener('click', () => {
        this.navigateToItem(bldg);
      });

      grid.appendChild(card);
    });
  }

  /* =========================================================
   BUILDING → FLOOR → ROOM → DETAILS EXPLORER
========================================================= */

  bindFloorExplorer() {

    const blockGrid = document.getElementById('explorer-blocks-grid');
    const floorGrid = document.getElementById('explorer-floors-grid');
    const roomGrid = document.getElementById('explorer-rooms-grid');

    if (!blockGrid || !floorGrid || !roomGrid) {
      console.warn('[Explorer] Explorer elements not found.');
      return;
    }

    /* -----------------------------------------
       BLOCK CLICK
    ----------------------------------------- */

    blockGrid.addEventListener('click', (event) => {

      const card = event.target.closest('[data-explorer-building]');

      if (!card) return;

      const buildingId = card.dataset.explorerBuilding;

      this.openExplorerBuilding(buildingId);
    });


    /* -----------------------------------------
       FLOOR CLICK
    ----------------------------------------- */

    floorGrid.addEventListener('click', (event) => {

      const card = event.target.closest('[data-explorer-floor]');

      if (!card) return;

      const floorId = card.dataset.explorerFloor;
      const buildingId = card.dataset.explorerBuilding;

      this.openExplorerFloor(buildingId, floorId);
    });


    /* -----------------------------------------
       ROOM CLICK
    ----------------------------------------- */

    roomGrid.addEventListener('click', (event) => {

      const card = event.target.closest('[data-explorer-room]');

      if (!card) return;

      const roomId = card.dataset.explorerRoom;

      const room = this.rooms.find(
        r => String(r.id) === String(roomId)
      );

      if (!room) return;

      this.openExplorerRoom(room);
    });


    /* -----------------------------------------
       BACK BUTTONS
    ----------------------------------------- */

    document
      .getElementById('explorer-back-blocks')
      ?.addEventListener('click', () => {

        this.showExplorerPanel('block');

      });


    document
      .getElementById('explorer-back-floors')
      ?.addEventListener('click', () => {

        this.showExplorerPanel('floor');

      });


    document
      .getElementById('explorer-back-rooms')
      ?.addEventListener('click', () => {

        this.showExplorerPanel('room');

      });


    /* -----------------------------------------
       ROOM SEARCH
    ----------------------------------------- */

    document
      .getElementById('explorer-room-search')
      ?.addEventListener('input', (event) => {

        this.filterExplorerRooms(event.target.value);

      });


    /* -----------------------------------------
       INITIAL BLOCK RENDER
    ----------------------------------------- */

    this.renderExplorerBlocks();
  }


  /* =========================================================
     SHOW EXPLORER PANEL
  ========================================================= */

  showExplorerPanel(panel) {

    const panels = {
      block: document.getElementById('explorer-block-view'),
      floor: document.getElementById('explorer-floor-view'),
      room: document.getElementById('explorer-room-view'),
      details: document.getElementById('explorer-details-view')
    };


    Object.values(panels).forEach(panelElement => {
      if (panelElement) {
        panelElement.style.display = 'none';
      }
    });

    if (panels[panel]) {
      panels[panel].style.display = 'block';
    }


    /* Step indicator */

    const stepMap = {
      block: 1,
      floor: 2,
      room: 3,
      details: 4
    };

    const currentStep = stepMap[panel] || 1;

    document
      .querySelectorAll('.explorer-step')
      .forEach((step, index) => {

        step.classList.toggle(
          'active',
          index + 1 <= currentStep
        );

      });
  }


  renderExplorerBlocks() {
    const grid = document.getElementById(
      'explorer-blocks-grid'
    );

    if (!grid) return;

    /*
     * Only show buildings that have BOTH:
     * 1. A verified floor record
     * 2. At least one verified room record
     *
     * This keeps unrelated campus buildings such as
     * hostels, parking, playground, etc. out of the
     * Block → Floor → Room directory.
     */
    const buildings = Array.isArray(this.buildings)
      ? this.buildings.filter(building => {
        const hasFloors = this.floors.some(
          floor =>
            String(floor.building_id) ===
            String(building.id)
        );

        const hasRooms = this.rooms.some(
          room =>
            String(room.building_id) ===
            String(building.id)
        );

        return hasFloors && hasRooms;
      })
      : [];

    if (!buildings.length) {
      grid.innerHTML = `
      <div class="explorer-empty">
        <div class="explorer-empty-icon">🏢</div>
        <h3>No verified campus blocks found</h3>
        <p>
          Please check the campus floor and room database.
        </p>
      </div>
    `;
      return;
    }

    grid.innerHTML = buildings
      .map((building, index) => {

        const roomCount = this.rooms.filter(
          room =>
            String(room.building_id) ===
            String(building.id)
        ).length;

        const floorCount = this.floors.filter(
          floor =>
            String(floor.building_id) ===
            String(building.id)
        ).length;

        return `
        <button
          type="button"
          class="explorer-block-card"
          data-explorer-building="${this.escapeExplorerValue(
          building.id
        )}"
        >

          <div class="explorer-block-icon">
            ${this.getExplorerBuildingIcon(index, building)}
          </div>

          <div class="explorer-block-content">

            <span class="explorer-card-label">
              ${this.escapeExplorerHtml(
            building.code || 'CAMPUS BLOCK'
          )
          }
            </span>

            <h3>
              ${this.escapeExplorerHtml(
            building.name || 'Campus Building'
          )
          }
            </h3>

            <p>
              ${this.escapeExplorerHtml(
            building.description ||
            'Explore verified floors and rooms.'
          )
          }
            </p>

            <div class="explorer-block-meta">

              <span>
                🏢 ${floorCount}
                ${floorCount === 1 ? 'Floor' : 'Floors'}
              </span>

              <span>
                🚪 ${roomCount}
                ${roomCount === 1 ? 'Room' : 'Rooms'}
              </span>

            </div>

          </div>

          <span class="explorer-card-arrow">
            →
          </span>

        </button>
      `;
      })
      .join('');
  }


  /* =========================================================
     STEP 1 → STEP 2
  ========================================================= */

  openExplorerBuilding(buildingId) {

    const building = this.buildings.find(
      b => String(b.id) === String(buildingId)
    );

    if (!building) return;

    this.explorerSelectedBuilding = building;


    const nameElement =
      document.getElementById('selected-building-name');

    const descriptionElement =
      document.getElementById(
        'selected-building-description'
      );


    if (nameElement) {

      nameElement.textContent =
        building.name || 'Campus Building';

    }


    if (descriptionElement) {

      descriptionElement.textContent =
        building.description ||
        'Select a floor to explore rooms.';

    }


    this.renderExplorerFloors(building.id);

    this.showExplorerPanel('floor');
  }


  /* =========================================================
     STEP 2 : RENDER FLOORS
  ========================================================= */

  renderExplorerFloors(buildingId) {

    const grid = document.getElementById(
      'explorer-floors-grid'
    );

    if (!grid) return;


    const floors = this.floors
      .filter(
        floor =>
          String(floor.building_id) ===
          String(buildingId)
      )
      .sort(
        (a, b) =>
          Number(a.floor_number || 0) -
          Number(b.floor_number || 0)
      );


    if (!floors.length) {

      grid.innerHTML = `
      <div class="explorer-empty">

        <div class="explorer-empty-icon">
          🏢
        </div>

        <h3>No floor information available</h3>

        <p>
          No verified floors are available
          for this building.
        </p>

      </div>
    `;

      return;
    }


    grid.innerHTML = floors
      .map((floor, index) => {

        const rooms = this.rooms.filter(
          room =>
            String(room.floor_id) ===
            String(floor.id)
        );

        const floorNumber =
          Number(floor.floor_number);


        let floorLabel = floor.floor_name;

        if (!floorLabel) {

          if (floorNumber === 0) {
            floorLabel = 'Ground Floor';
          } else {
            floorLabel =
              `${floorNumber}${this.getOrdinal(floorNumber)} Floor`;
          }

        }


        return `
        <button
          type="button"
          class="explorer-floor-card"
          data-explorer-floor="${this.escapeExplorerValue(floor.id)}"
          data-explorer-building="${this.escapeExplorerValue(buildingId)}"
        >

          <div class="explorer-floor-number">
            ${floorNumber === 0 ? 'G' : floorNumber}
          </div>

          <div class="explorer-floor-content">

            <span class="explorer-card-label">
              FLOOR ${floorNumber === 0 ? 'G' : floorNumber}
            </span>

            <h3>
              ${this.escapeExplorerHtml(floorLabel)}
            </h3>

            <p>
              ${this.escapeExplorerHtml(
          floor.description ||
          'Explore rooms on this floor.'
        )}
            </p>

            <div class="explorer-floor-meta">

              <span>
                🚪 ${rooms.length}
                ${rooms.length === 1 ? 'Room' : 'Rooms'}
              </span>

            </div>

          </div>

          <span class="explorer-card-arrow">
            →
          </span>

        </button>
      `;

      })
      .join('');
  }


  /* =========================================================
     STEP 2 → STEP 3
  ========================================================= */

  openExplorerFloor(buildingId, floorId) {

    const floor = this.floors.find(
      f =>
        String(f.id) ===
        String(floorId)
    );

    if (!floor) return;

    this.explorerSelectedFloor = floor;


    const floorName =
      document.getElementById(
        'selected-floor-name'
      );

    const floorDescription =
      document.getElementById(
        'selected-floor-description'
      );


    if (floorName) {

      floorName.textContent =
        floor.floor_name ||
        'Selected Floor';

    }


    if (floorDescription) {

      floorDescription.textContent =
        floor.description ||
        'Select a room below.';

    }


    const search =
      document.getElementById(
        'explorer-room-search'
      );

    if (search) {

      search.value = '';

    }


    this.renderExplorerRooms(
      buildingId,
      floorId
    );

    this.showExplorerPanel('room');
  }


  /* =========================================================
     STEP 3 : RENDER ROOMS
  ========================================================= */

  renderExplorerRooms(buildingId, floorId) {

    const grid = document.getElementById(
      'explorer-rooms-grid'
    );

    const count = document.getElementById(
      'explorer-room-count'
    );

    if (!grid) return;


    const rooms = this.rooms.filter(room => {

      const sameBuilding =
        String(room.building_id) ===
        String(buildingId);

      const sameFloor =
        String(room.floor_id) ===
        String(floorId);

      return sameBuilding && sameFloor;

    });


    this.explorerCurrentRooms = rooms;


    if (count) {

      count.textContent =
        rooms.length;

    }


    if (!rooms.length) {

      grid.innerHTML = `
      <div class="explorer-empty">

        <div class="explorer-empty-icon">
          🚪
        </div>

        <h3>No verified rooms found</h3>

        <p>
          There are no room records available
          for this floor.
        </p>

      </div>
    `;

      return;
    }


    grid.innerHTML = rooms
      .map((room, index) => {

        const roomNumber =
          room.room_number ||
          room.room_no ||
          room.number ||
          '—';

        const roomName =
          room.name ||
          room.room_name ||
          'Room';


        return `
        <button
          type="button"
          class="explorer-room-card"
          data-explorer-room="${this.escapeExplorerValue(room.id)}"
        >

          <div class="explorer-room-number">
            ${this.escapeExplorerHtml(
          String(roomNumber)
        )}
          </div>

          <div class="explorer-room-content">

            <span class="explorer-room-type">
              ${this.escapeExplorerHtml(
          room.type || 'ROOM'
        )}
            </span>

            <h3>
              ${this.escapeExplorerHtml(
          roomName
        )}
            </h3>

            <p>
              ${this.escapeExplorerHtml(
          room.description ||
          'Verified campus room'
        )}
            </p>

          </div>

          <span class="explorer-card-arrow">
            →
          </span>

        </button>
      `;

      })
      .join('');
  }


  /* =========================================================
     ROOM SEARCH
  ========================================================= */

  filterExplorerRooms(query) {

    const grid = document.getElementById(
      'explorer-rooms-grid'
    );

    if (!grid) return;


    const q = String(query || '')
      .trim()
      .toLowerCase();


    const rooms =
      this.explorerCurrentRooms || [];


    const filtered = rooms.filter(room => {

      const text = [
        room.id,
        room.room_number,
        room.room_no,
        room.number,
        room.name,
        room.room_name,
        room.type,
        room.description,
        room.department,
        room.department_name
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return text.includes(q);

    });


    const count =
      document.getElementById(
        'explorer-room-count'
      );

    if (count) {

      count.textContent =
        filtered.length;

    }


    if (!filtered.length) {

      grid.innerHTML = `
      <div class="explorer-empty">

        <div class="explorer-empty-icon">
          🔎
        </div>

        <h3>No matching room</h3>

        <p>
          Try another room number or room name.
        </p>

      </div>
    `;

      return;
    }


    grid.innerHTML = filtered
      .map(room => {

        const roomNumber =
          room.room_number ||
          room.room_no ||
          room.number ||
          '—';

        const roomName =
          room.name ||
          room.room_name ||
          'Room';


        return `
        <button
          type="button"
          class="explorer-room-card"
          data-explorer-room="${this.escapeExplorerValue(room.id)}"
        >

          <div class="explorer-room-number">
            ${this.escapeExplorerHtml(
          String(roomNumber)
        )}
          </div>

          <div class="explorer-room-content">

            <span class="explorer-room-type">
              ${this.escapeExplorerHtml(
          room.type || 'ROOM'
        )}
            </span>

            <h3>
              ${this.escapeExplorerHtml(roomName)}
            </h3>

            <p>
              ${this.escapeExplorerHtml(
          room.description ||
          'Verified campus room'
        )}
            </p>

          </div>

          <span class="explorer-card-arrow">
            →
          </span>

        </button>
      `;

      })
      .join('');
  }


  /* =========================================================
     STEP 3 → STEP 4
  ========================================================= */

  openExplorerRoom(room) {

    this.explorerSelectedRoom = room;

    const container =
      document.getElementById(
        'explorer-room-details'
      );

    if (!container) return;


    const building =
      this.buildings.find(
        b =>
          String(b.id) ===
          String(room.building_id)
      );


    const floor =
      this.floors.find(
        f =>
          String(f.id) ===
          String(room.floor_id)
      );


    const roomNumber =
      room.room_number ||
      room.room_no ||
      room.number ||
      '—';


    const roomName =
      room.name ||
      room.room_name ||
      'Room';


    container.innerHTML = `

    <div class="room-detail-card">

      <div class="room-detail-icon">
        🚪
      </div>

      <div class="room-detail-main">

        <span class="explorer-eyebrow">
          VERIFIED ROOM
        </span>

        <h2>
          Room ${this.escapeExplorerHtml(
      String(roomNumber)
    )}
        </h2>

        <h3>
          ${this.escapeExplorerHtml(roomName)}
        </h3>

        <p class="room-detail-description">
          ${this.escapeExplorerHtml(
      room.description ||
      'Verified campus room.'
    )}
        </p>

      </div>

      <div class="room-detail-info">

        <div>
          <span>Building</span>
          <strong>
            ${this.escapeExplorerHtml(
      building?.name || '—'
    )}
          </strong>
        </div>

        <div>
          <span>Floor</span>
          <strong>
            ${this.escapeExplorerHtml(
      floor?.floor_name || '—'
    )}
          </strong>
        </div>

        <div>
          <span>Room Type</span>
          <strong>
            ${this.escapeExplorerHtml(
      room.type || 'Room'
    )}
          </strong>
        </div>

        ${room.department_id
        ? `
              <div>
                <span>Department</span>
                <strong>
                  ${this.escapeExplorerHtml(
          this.getExplorerDepartmentName(
            room.department_id
          )
        )}
                </strong>
              </div>
            `
        : ''
      }

      </div>

    </div>
  `;


    document
      .getElementById('explorer-room-map-btn')
      ?.addEventListener('click', () => {

        this.focusItemOnMap(room);

      });


    document
      .getElementById('explorer-room-nav-btn')
      ?.addEventListener('click', () => {

        this.navigateToItem(room);

      });


    this.showExplorerPanel('details');
  }


  /* =========================================================
     OPEN FLOOR EXPLORER FROM BUILDING CARD
  ========================================================= */

  openFloorExplorerForBuilding(buildingId) {

    this.switchView('explorer');

    this.openExplorerBuilding(buildingId);
  }


  /* =========================================================
     HELPERS
  ========================================================= */

  getExplorerBuildingIcon(index, building) {
    return this.iconSvgForName(building?.name || building?.code || 'building');
  }


  getExplorerDepartmentName(departmentId) {

    const department =
      this.departments.find(
        d =>
          String(d.id) ===
          String(departmentId)
      );

    return department
      ? (
        department.code
          ? `${department.name} (${department.code})`
          : department.name
      )
      : '—';
  }


  getOrdinal(number) {

    if (number % 100 >= 11 &&
      number % 100 <= 13) {

      return 'th';

    }

    switch (number % 10) {

      case 1:
        return 'st';

      case 2:
        return 'nd';

      case 3:
        return 'rd';

      default:
        return 'th';

    }

  }


  escapeExplorerHtml(value) {

    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  }


  escapeExplorerValue(value) {

    return this.escapeExplorerHtml(value);

  }
  facilityIcon(fac) {
    // Purpose-built inline SVGs keep facility cards crisp and consistent (no emoji/font dependency).
    const name = String(fac.name || '').toLowerCase();
    const category = String(fac.category || '').toLowerCase();
    const paths = {
      cafeteria: '<path d="M3 3h18v18H3zM7 7h10M7 11h10M7 15h6"/>',
      cricket: '<circle cx="12" cy="12" r="9"/><path d="M6 6l12 12M18 6 6 18"/>',
      playground: '<path d="M3 21V9l9-6 9 6v12M7 21v-7h10v7M2 21h20"/>',
      bus: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 19v2M17 19v2M7 15h.01M17 15h.01"/><path d="M7 5V3h10v2"/>',
      sports: '<path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="m7 4 10 16M17 4 7 20M3 12h18"/>',
      food: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3v18M17 3c3 2 4 6 0 9"/>',
      gate: '<path d="M3 21V5l9-3 9 3v16M3 9h18M8 9v12M16 9v12M1 21h22"/>',
      gym: '<path d="M2 9v6M5 6v12M19 6v12M22 9v6M5 12h14"/>',
      parking: '<path d="M5 21V3h8a5 5 0 0 1 0 10H5M5 13h8"/>',
      building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
      pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>'
    };
    let key = 'building';
    if (/bus|terminal|transport/.test(name) || /transport/.test(category)) key = 'bus';
    else if (/cafeteria|refreshment kiosk/.test(name)) key = 'cafeteria';
    else if (/cricket/.test(name)) key = 'cricket';
    else if (/playground|play ground|sports arena|athletics track/.test(name)) key = 'playground';
    else if (/sports|arena|athletic/.test(name) || /sports/.test(category)) key = 'sports';
    else if (/canteen|dining|food/.test(name) || /food/.test(category)) key = 'food';
    else if (/gate|security/.test(name)) key = 'gate';
    else if (/gym|fitness/.test(name)) key = 'gym';
    else if (/parking/.test(name) || /parking/.test(category)) key = 'parking';
    return `<svg class="facility-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[key]}</svg>`;
  }

  renderFacilities() {
    const grid = document.getElementById('facilities-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';
    this.facilities.forEach(fac => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-top">
          <div class="card-icon">${this.facilityIcon(fac)}</div>
          <span class="card-tag">${fac.category.toUpperCase()}</span>
        </div>
        <div class="card-title">${fac.name}</div>
        <div class="card-description">${fac.description}</div>
        <div class="facility-location">
          <svg class="facility-pin-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          ${fac.location_desc}
        </div>
        <div class="card-actions">
          <button class="btn btn-outline" data-fac-id="${fac.id}" data-action="locate">Locate On Map</button>
          <button class="btn btn-primary" data-fac-id="${fac.id}" data-action="nav">Navigate</button>
        </div>
      `;

      card.querySelector('[data-action="locate"]')?.addEventListener('click', () => {
        this.focusItemOnMap(fac);
      });

      card.querySelector('[data-action="nav"]')?.addEventListener('click', () => {
        this.navigateToItem(fac);
      });

      grid.appendChild(card);
    });
  }

  renderAnnouncements() {
    const feed = document.getElementById('announcements-feed');
    if (!feed) return;

    feed.innerHTML = '';
    this.announcements.forEach(ann => {
      const item = document.createElement('div');
      item.className = 'card';
      item.style.marginBottom = '1rem';
      item.innerHTML = `
        <div class="card-top" style="margin-bottom:0.5rem;">
          <span class="card-tag" style="${ann.priority === 'high' ? 'background:rgba(239, 68, 68, 0.2); color:#f87171;' : ''}">${ann.category}</span>
          <span style="font-size:0.75rem; color:var(--text-dim);">${ann.date}</span>
        </div>
        <div class="card-title" style="font-size:1.05rem;">${ann.title}</div>
        <div class="card-description" style="margin-bottom:0;">${ann.content}</div>
      `;
      feed.appendChild(item);
    });
  }

  renderContacts() {
    const grid = document.getElementById('contacts-grid');
    if (!grid) return;

    API.getContacts().then(contacts => {
      grid.innerHTML = '';
      contacts.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-title" style="font-size:1.1rem; color:var(--secondary);">${c.role}</div>
          <div style="font-weight:600; margin-bottom:0.25rem;">${c.department}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">${c.location}</div>
          <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.85rem;">
            <div>📞 <a href="tel:${c.phone}">${c.phone}</a></div>
            <div>✉️ <a href="mailto:${c.email}">${c.email}</a></div>
          </div>
        `;
        grid.appendChild(card);
      });
    }).catch(e => console.error('Contacts load error:', e));
  }

  bindBuildingSelectionEvent() {
    window.addEventListener('campus:buildingSelected', (e) => {
      const bldgId = e.detail.buildingId;
      const bldg = this.buildings.find(b => b.id === bldgId);
      if (!bldg) return;

      this.showToast(`Selected: ${bldg.name}`, 'info');
      // Set destination in navigation
      if (window.NavManager) {
        const matchingNode = window.NavManager.nodes.find(n => n.building_id === bldg.id);
        if (matchingNode) {
          window.NavManager.destSelect.value = matchingNode.id;
        }
      }
    });
  }

  animateStatCounters() {
    API.getStats().then(stats => {
      const countBldg = document.getElementById('stat-count-buildings');
      const countDept = document.getElementById('stat-count-departments');
      const countFloor = document.getElementById('stat-count-floors');
      const countRoom = document.getElementById('stat-count-rooms');
      const countFac = document.getElementById('stat-count-facilities');
      const countQR = document.getElementById('stat-count-qr');

      if (countBldg) this.countUp(countBldg, stats.buildings);
      if (countDept) this.countUp(countDept, stats.departments);
      if (countFloor) this.countUp(countFloor, stats.floors);
      if (countRoom) this.countUp(countRoom, stats.rooms);
      if (countFac) this.countUp(countFac, stats.facilities);
      if (countQR) this.countUp(countQR, stats.qrLocations);
    }).catch(e => console.error(e));
  }

  countUp(element, target) {
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, 40);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✅' : type === 'danger' ? '⚠️' : type === 'warning' ? '⚡' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.App = new CampusApp();
});
