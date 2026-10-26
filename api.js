// API Client for MIC Campus Explorer
const API = {
  baseUrl: '/api',

  async getStats() {
    const res = await fetch(`${this.baseUrl}/stats`);
    if (!res.ok) throw new Error('Failed to fetch statistics');
    return res.json();
  },

  async getBuildings() {
    const res = await fetch(`${this.baseUrl}/buildings`);
    if (!res.ok) throw new Error('Failed to fetch buildings');
    return res.json();
  },

  async getBuildingById(id) {
    const res = await fetch(`${this.baseUrl}/buildings/${id}`);
    if (!res.ok) throw new Error('Failed to fetch building details');
    return res.json();
  },

  async getDepartments() {
    const res = await fetch(`${this.baseUrl}/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments');
    return res.json();
  },

  async getFloors(buildingId = '') {
    const url = buildingId ? `${this.baseUrl}/floors?buildingId=${buildingId}` : `${this.baseUrl}/floors`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch floors');
    return res.json();
  },

  async getRooms() {
    const res = await fetch(`${this.baseUrl}/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  },

  async getFacilities(category = 'all') {
    const url = category !== 'all' ? `${this.baseUrl}/facilities?category=${category}` : `${this.baseUrl}/facilities`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch facilities');
    return res.json();
  },

  async search(query, category = 'all') {
    const res = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Search request failed');
    return res.json();
  },

  async getNavNodes() {
    const res = await fetch(`${this.baseUrl}/navigation/nodes`);
    if (!res.ok) throw new Error('Failed to fetch navigation nodes');
    return res.json();
  },

  async calculateRoute(fromNode, toNode) {
    const res = await fetch(`${this.baseUrl}/navigation/route?from=${encodeURIComponent(fromNode)}&to=${encodeURIComponent(toNode)}`);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Failed to calculate route');
    }
    return res.json();
  },

  async getQRLocation(code) {
    const res = await fetch(`${this.baseUrl}/qr/${encodeURIComponent(code)}`);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'QR code not recognized');
    }
    return res.json();
  },

  async getAllQRLocations() {
    const res = await fetch(`${this.baseUrl}/qr/locations`);
    if (!res.ok) throw new Error('Failed to fetch QR locations');
    return res.json();
  },

  async getAnnouncements() {
    const res = await fetch(`${this.baseUrl}/announcements`);
    if (!res.ok) throw new Error('Failed to fetch announcements');
    return res.json();
  },

  async getContacts() {
    const res = await fetch(`${this.baseUrl}/contacts`);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  }
};
