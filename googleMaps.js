// Google Maps & Outside Campus Navigation Integration
// DVR & Dr. HS MIC College of Technology Coordinates: 16.5824° N, 80.3957° E
// Location: NH 65, Kanchikacherla, Krishna District, Andhra Pradesh 521180

const MIC_COLLEGE_INFO = {
  lat: 16.5824,
  lng: 80.3957,
  name: 'DVR & Dr. HS MIC College of Technology',
  address: 'NH 65, Kanchikacherla, Krishna District, Andhra Pradesh 521180',
  googleMapsPlaceUrl: 'https://maps.google.com/?q=DVR+%26+Dr.+HS+MIC+College+of+Technology,+Kanchikacherla,+Andhra+Pradesh'
};

class GoogleMapsService {
  constructor() {
    this.mapContainer = document.getElementById('google-maps-view');
    this.locateBtn = document.getElementById('btn-locate-me');
    this.externalNavBtn = document.getElementById('btn-external-road-nav');
    this.userLat = null;
    this.userLng = null;

    this.bindEvents();
  }

  bindEvents() {
    if (this.locateBtn) {
      this.locateBtn.addEventListener('click', () => this.getUserGeolocation());
    }

    if (this.externalNavBtn) {
      this.externalNavBtn.addEventListener('click', () => this.openGoogleMapsExternal());
    }
  }

  getUserGeolocation() {
    if (!navigator.geolocation) {
      if (window.App) window.App.showToast('Geolocation is not supported by your browser.', 'warning');
      return;
    }

    if (window.App) window.App.showToast('Acquiring live GPS satellite positioning...', 'info');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        const distKm = this.calculateHaversineDistance(this.userLat, this.userLng, MIC_COLLEGE_INFO.lat, MIC_COLLEGE_INFO.lng);

        if (distKm > 1.5) {
          // Outside Campus
          if (window.App) {
            window.App.showToast(`GPS Position: You are ${distKm.toFixed(1)} km from MIC College. Follow Google Maps NH-65 route to Main Gate!`, 'info');
          }
          if (window.CampusMap) {
            window.CampusMap.setGPSLocation('node-gate');
          }
        } else {
          // Inside Campus
          if (window.App) {
            window.App.showToast(`GPS Location Locked: Inside MIC College Campus (~${Math.round(distKm * 1000)}m from Main Gate).`, 'success');
          }
          if (window.CampusMap) {
            window.CampusMap.setGPSLocation('node-gate');
          }
        }
      },
      (err) => {
        console.warn('GPS location error:', err);
        if (window.App) {
          window.App.showToast('GPS fix unavailable. Access into campus is via the Main Gate only.', 'warning');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  openGoogleMapsExternal(origin = '') {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${MIC_COLLEGE_INFO.lat},${MIC_COLLEGE_INFO.lng}&destination_place_id=DVR+Dr+HS+MIC+College+of+Technology`;
    if (origin) {
      url += `&origin=${encodeURIComponent(origin)}`;
    } else if (this.userLat && this.userLng) {
      url += `&origin=${this.userLat},${this.userLng}`;
    }
    window.open(url, '_blank');
  }

  renderGoogleMapEmbed() {
    if (!this.mapContainer) return;
    this.mapContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; height:100%; background:var(--bg-surface); border-radius:18px; overflow:hidden;">
        
        <!-- Google Maps College Banner & Directions Search Widget -->
        <div style="background:linear-gradient(135deg, #1e3a8a, #0284c7); padding:1.25rem 1.5rem; color:white; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:#38bdf8; font-weight:700;">Google Maps Platform • Road Navigation</div>
            <div style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800;">DVR & Dr. HS MIC College of Technology</div>
            <div style="font-size:0.85rem; color:#e2e8f0; opacity:0.9;">📍 NH-65, Kanchikacherla, Krishna District, AP - 521180 (Only Entry: Main Gate)</div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-accent btn-mini" id="btn-gmap-live-directions" style="padding:0.6rem 1rem; font-size:0.85rem;">
              🚗 Launch Google Maps Live Turn-By-Turn Navigation
            </button>
          </div>
        </div>

        <!-- Quick Travel Routes from Major Hubs -->
        <div style="background:var(--bg-surface-elevated); padding:0.75rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem; font-size:0.8rem;">
          <span style="color:var(--text-muted); font-weight:600;">Direct Highway Directions to Main Gate:</span>
          <button class="btn-mini btn-mini-primary" onclick="window.GoogleMaps.openGoogleMapsExternal('Vijayawada')">From Vijayawada (~35 km via NH-65)</button>
          <button class="btn-mini btn-mini-primary" onclick="window.GoogleMaps.openGoogleMapsExternal('Guntur')">From Guntur (~45 km)</button>
          <button class="btn-mini btn-mini-primary" onclick="window.GoogleMaps.openGoogleMapsExternal('Nandigama')">From Nandigama (~14 km)</button>
          <button class="btn-mini btn-mini-primary" onclick="window.GoogleMaps.openGoogleMapsExternal('Hyderabad')">From Hyderabad (~240 km via NH-65)</button>
        </div>

        <!-- Google Maps Interactive Frame -->
        <div style="flex:1; width:100%; min-height:450px; position:relative;">
          <iframe
            id="gmaps-iframe"
            width="100%"
            height="100%"
            style="border:0; position:absolute; inset:0;"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=DVR+%26+Dr.+HS+MIC+College+of+Technology,+Kanchikacherla&t=&z=16&ie=UTF8&iwloc=&output=embed">
          </iframe>
        </div>
      </div>
    `;

    document.getElementById('btn-gmap-live-directions')?.addEventListener('click', () => {
      this.openGoogleMapsExternal();
    });
  }
}

window.GoogleMapsService = GoogleMapsService;
