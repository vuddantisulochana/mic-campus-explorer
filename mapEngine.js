// Custom Interactive SVG Campus Map Engine for MIC College of Technology
// Meticulously mapped to the official COLLEGE PLAN (media_1787952704652.jpg)

class CampusMapEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.svg = null;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.activeBuildingId = null;
    this.activeFilter = 'all';
    this.buildingsData = [];
    this.nodesData = [];
    this.currentRoute = null;
    this.gpsLocation = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.createSVG();
    this.bindEvents();
  }

  createSVG() {
    const svgNS = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(svgNS, 'svg');
    this.svg.setAttribute('id', 'campus-svg-canvas');
    this.svg.setAttribute('viewBox', '0 0 1000 750');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');

    // Root Group for Pan/Zoom transforms
    this.viewportGroup = document.createElementNS(svgNS, 'g');
    this.viewportGroup.setAttribute('id', 'viewport-group');
    this.svg.appendChild(this.viewportGroup);

    // Defs: Gradients, Filters & Markers
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `
      <pattern id="grass-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#064e3b" />
        <circle cx="5" cy="5" r="1.5" fill="#047857" opacity="0.6" />
        <circle cx="15" cy="15" r="1.5" fill="#047857" opacity="0.6" />
      </pattern>
      <linearGradient id="ground-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14532d" />
        <stop offset="100%" stop-color="#166534" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    `;
    this.svg.appendChild(defs);

    // 1. Campus Ground / Background
    const bgRect = document.createElementNS(svgNS, 'rect');
    bgRect.setAttribute('x', '0');
    bgRect.setAttribute('y', '0');
    bgRect.setAttribute('width', '1000');
    bgRect.setAttribute('height', '750');
    bgRect.setAttribute('fill', 'var(--map-bg)');
    this.viewportGroup.appendChild(bgRect);

    // 2. Lawns & Green Zones
    const lawnsGroup = document.createElementNS(svgNS, 'g');
    lawnsGroup.setAttribute('id', 'lawns-layer');
    lawnsGroup.innerHTML = `
      <!-- North-West Green Lawn -->
      <rect x="50" y="80" width="200" height="180" class="svg-lawn" />
      <!-- Central Court Lawn -->
      <rect x="330" y="160" width="45" height="380" class="svg-lawn" />
      <!-- South Green Lawn -->
      <rect x="50" y="590" width="440" height="90" class="svg-lawn" />
      <!-- Eastern Sports Playground -->
      <rect x="530" y="330" width="340" height="290" class="svg-playground" />
      <!-- Cricket Nets Box inside Playground -->
      <rect x="550" y="575" width="110" height="40" fill="#15803d" stroke="#22c55e" stroke-dasharray="3 3" rx="4" />
      <text x="605" y="600" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Cricket Nets</text>
      <!-- Playground Center Label -->
      <text x="700" y="470" fill="#ffffff" font-size="20" font-family="var(--font-heading)" font-weight="800" text-anchor="middle" letter-spacing="1">PLAY GROUND</text>
    `;
    this.viewportGroup.appendChild(lawnsGroup);

    // 3. Official Internal Roads & Paved Pathways (The Blue Lines on the College Plan)
    const roadsGroup = document.createElementNS(svgNS, 'g');
    roadsGroup.setAttribute('id', 'roads-layer');
    roadsGroup.innerHTML = `
      <!-- East Perimeter Road (From Main Gate Northward to Parking-2 and North Road) -->
      <path d="M 885,690 L 885,110 L 150,110" class="svg-road" />
      <path d="M 885,690 L 885,110 L 150,110" class="svg-road-curb" />
      <path d="M 700,660 L 150,660" class="svg-road" />
      <path d="M 700,660 L 150,660" class="svg-road-curb" />

      <!-- West Roadway (From South-West Corner Northward between Labs/BED and Diploma Blocks) -->
      <path d="M 260,640 L 260,110" class="svg-road" />
      <path d="M 260,640 L 260,110" class="svg-road-curb" />

      <!-- Road Between Main Academic Block and Play Ground -->
      <path d="M 505,340 L 505,640 L 420,640" class="svg-road" />
      <path d="M 505,340 L 505,640 L 420,640" class="svg-road-curb" />

      <!-- Central Boulevard (From East Road directly West to Main Academic Block Entrance) -->
      <path d="M 885,340 L 450,340" class="svg-road" />
      <path d="M 885,340 L 450,340" class="svg-road-curb" />

      <!-- Parking-1 Connecting North-South Road -->
      <path d="M 525,340 L 525,110" class="svg-road" style="stroke-width:14" />
      
      <!-- Building Feeder Links -->
      <path d="M 260,370 L 150,370" class="svg-road" style="stroke-width:12" /> <!-- BED link -->
      <path d="M 260,370 L 380,370" class="svg-road" style="stroke-width:12" /> <!-- Diploma & Main Block link -->

        <!-- Diploma Block-2 Access Road -->
        <path d="M 260,370 L 260,550 L 330,550" class="svg-road" style="stroke-width:12" />
        <path d="M 260,370 L 260,550 L 330,550" class="svg-road-curb" />
        <path d="M 330,550 L 330,535" class="svg-road" style="stroke-width:12" />
      <path d="M 260,500 L 150,500" class="svg-road" style="stroke-width:12" /> <!-- Labs link -->
      <path d="M 150,110 L 150,160" class="svg-road" style="stroke-width:12" /> <!-- Girls Hostel link -->
      <path d="M 420,640 L 420,630" class="svg-road" style="stroke-width:12" /> <!-- Boys Hostel link -->
      <path d="M 310,640 L 310,630" class="svg-road" style="stroke-width:12" /> <!-- Open Gym link -->
      <path d="M 150,640 L 150,630" class="svg-road" style="stroke-width:12" /> <!-- Canteen link -->
    `;
    this.viewportGroup.appendChild(roadsGroup);

    // 4. Buildings Layer
    this.buildingsGroup = document.createElementNS(svgNS, 'g');
    this.buildingsGroup.setAttribute('id', 'buildings-layer');
    this.viewportGroup.appendChild(this.buildingsGroup);

    // 5. Dynamic Route Layer (Drawn strictly on top of roads)
    this.routeGroup = document.createElementNS(svgNS, 'g');
    this.routeGroup.setAttribute('id', 'route-layer');
    this.viewportGroup.appendChild(this.routeGroup);

    // 6. Navigation Nodes & Markers Layer
    this.markersGroup = document.createElementNS(svgNS, 'g');
    this.markersGroup.setAttribute('id', 'markers-layer');
    this.viewportGroup.appendChild(this.markersGroup);

    // 7. GPS "You Are Here" Pin Layer
    this.gpsGroup = document.createElementNS(svgNS, 'g');
    this.gpsGroup.setAttribute('id', 'gps-layer');
    this.viewportGroup.appendChild(this.gpsGroup);

    this.container.appendChild(this.svg);
  }

  bindEvents() {
    this.container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this.isDragging = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      this.setZoom(this.zoom * zoomFactor);
    }, { passive: false });

    // Touch Support for Mobile
    let touchStartDist = 0;
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.container.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        this.panX = e.touches[0].clientX - this.startX;
        this.panY = e.touches[0].clientY - this.startY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / (touchStartDist || currentDist);
        this.setZoom(this.zoom * factor);
        touchStartDist = currentDist;
      }
    });

    this.container.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setZoom(newZoom) {
    this.zoom = Math.min(Math.max(0.6, newZoom), 3.5);
    this.updateTransform();
  }

  zoomIn() {
    this.setZoom(this.zoom * 1.25);
  }

  zoomOut() {
    this.setZoom(this.zoom / 1.25);
  }

  resetView() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
  }

  updateTransform() {
    if (this.viewportGroup) {
      this.viewportGroup.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);
    }
  }

  loadBuildings(buildings) {
    this.buildingsData = buildings;
    this.renderBuildings();
  }

  renderBuildings() {
    if (!this.buildingsGroup) return;
    this.buildingsGroup.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';

    this.buildingsData.forEach(bldg => {
      const shape = bldg.svg_shape;
      if (!shape) return;

      const group = document.createElementNS(svgNS, 'g');
      group.setAttribute('class', `building-group ${bldg.category}`);
      group.setAttribute('id', `bldg-svg-${bldg.id}`);

      // Main Building Polygon / Rect
      if (bldg.id === 'bldg-macb') {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', `
          M 380,150 
          L 480,150 
          L 480,310 
          A 35 35 0 0 1 480,370 
          L 480,570 
          L 380,570 
          L 380,150 Z
        `);
        path.setAttribute('class', 'svg-building');
        path.setAttribute('fill', bldg.color || 'var(--map-building)');
        group.appendChild(path);

        // Entrance Porch
        const rotunda = document.createElementNS(svgNS, 'path');
        rotunda.setAttribute('d', 'M 480,315 A 30 30 0 0 1 480,365 L 515,340 Z');
        rotunda.setAttribute('fill', '#38bdf8');
        rotunda.setAttribute('stroke', '#ffffff');
        group.appendChild(rotunda);

      } else if (bldg.id === 'bldg-gh') {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', '155');
        circle.setAttribute('cy', '165');
        circle.setAttribute('r', '55');
        circle.setAttribute('class', 'svg-building');
        circle.setAttribute('fill', bldg.color || '#db2777');
        group.appendChild(circle);

        const innerHole = document.createElementNS(svgNS, 'circle');
        innerHole.setAttribute('cx', '155');
        innerHole.setAttribute('cy', '165');
        innerHole.setAttribute('r', '22');
        innerHole.setAttribute('fill', 'var(--map-bg)');
        group.appendChild(innerHole);

      } else {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', shape.x);
        rect.setAttribute('y', shape.y);
        rect.setAttribute('width', shape.width);
        rect.setAttribute('height', shape.height);
        rect.setAttribute('class', 'svg-building');
        rect.setAttribute('fill', bldg.color || 'var(--map-building)');
        group.appendChild(rect);
      }

      // Building Label Text
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', shape.x + shape.width / 2);
      text.setAttribute('y', shape.y + shape.height / 2);
      text.setAttribute('class', 'svg-building-label');
      text.textContent = shape.label || bldg.name;
      group.appendChild(text);

      // Click Event
      group.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectBuilding(bldg.id);
      });

      this.buildingsGroup.appendChild(group);
    });
  }

  selectBuilding(buildingId) {
    this.activeBuildingId = buildingId;
    document.querySelectorAll('.svg-building').forEach(el => el.classList.remove('active'));
    
    const targetGroup = document.getElementById(`bldg-svg-${buildingId}`);
    if (targetGroup) {
      const bldgShape = targetGroup.querySelector('.svg-building');
      if (bldgShape) bldgShape.classList.add('active');
    }

    const event = new CustomEvent('campus:buildingSelected', { detail: { buildingId } });
    window.dispatchEvent(event);
  }

  setLayerFilter(category) {
    this.activeFilter = category;
    if (!this.buildingsGroup) return;

    this.buildingsData.forEach(b => {
      const el = document.getElementById(`bldg-svg-${b.id}`);
      if (!el) return;
      if (category === 'all' || b.category === category) {
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      } else {
        el.style.opacity = '0.25';
        el.style.pointerEvents = 'none';
      }
    });
  }

  // Draw Calculated Shortest Path strictly along internal road network
  drawRoute(pathNodes) {
    if (!this.routeGroup) return;
    this.routeGroup.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';

    if (!pathNodes || pathNodes.length < 2) return;

    let pathD = `M ${pathNodes[0].x},${pathNodes[0].y}`;
    for (let i = 1; i < pathNodes.length; i++) {
      pathD += ` L ${pathNodes[i].x},${pathNodes[i].y}`;
    }

    const routePath = document.createElementNS(svgNS, 'path');
    routePath.setAttribute('d', pathD);
    routePath.setAttribute('class', 'svg-route-path');
    this.routeGroup.appendChild(routePath);

    // Origin Pin
    const originPin = document.createElementNS(svgNS, 'circle');
    originPin.setAttribute('cx', pathNodes[0].x);
    originPin.setAttribute('cy', pathNodes[0].y);
    originPin.setAttribute('r', '8');
    originPin.setAttribute('fill', '#38bdf8');
    originPin.setAttribute('stroke', '#ffffff');
    originPin.setAttribute('stroke-width', '2');
    this.routeGroup.appendChild(originPin);

    // Destination Pin
    const endNode = pathNodes[pathNodes.length - 1];
    const destPin = document.createElementNS(svgNS, 'circle');
    destPin.setAttribute('cx', endNode.x);
    destPin.setAttribute('cy', endNode.y);
    destPin.setAttribute('r', '9');
    destPin.setAttribute('fill', '#ef4444');
    destPin.setAttribute('stroke', '#ffffff');
    destPin.setAttribute('stroke-width', '2');
    this.routeGroup.appendChild(destPin);

    // Animated Walking Marker along Path
    const walker = document.createElementNS(svgNS, 'circle');
    walker.setAttribute('r', '6');
    walker.setAttribute('class', 'svg-walker-marker');
    
    const anim = document.createElementNS(svgNS, 'animateMotion');
    anim.setAttribute('path', pathD);
    anim.setAttribute('dur', `${Math.max(4, pathNodes.length * 1.2)}s`);
    anim.setAttribute('repeatCount', 'indefinite');
    walker.appendChild(anim);

    this.routeGroup.appendChild(walker);

    // Focus View on Route Center
    const midX = (pathNodes[0].x + endNode.x) / 2;
    const midY = (pathNodes[0].y + endNode.y) / 2;
    this.panToCoordinate(midX, midY, 1.2);
  }

  clearRoute() {
    if (this.routeGroup) {
      this.routeGroup.innerHTML = '';
    }
  }

  panToCoordinate(x, y, targetZoom = 1.3) {
    const containerW = this.container.clientWidth || 800;
    const containerH = this.container.clientHeight || 600;

    this.zoom = targetZoom;
    this.panX = (containerW / 2) - (x * this.zoom);
    this.panY = (containerH / 2) - (y * this.zoom);
    this.updateTransform();
  }

  setGPSLocation(nodeId) {
    if (!this.gpsGroup) return;
    this.gpsGroup.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';

    let x = 885, y = 660; // Main Gate
    if (nodeId) {
      const node = this.nodesData.find(n => n.id === nodeId);
      if (node) {
        x = node.x;
        y = node.y;
      }
    }

    const pulse = document.createElementNS(svgNS, 'circle');
    pulse.setAttribute('cx', x);
    pulse.setAttribute('cy', y);
    pulse.setAttribute('fill', '#38bdf8');
    pulse.setAttribute('class', 'svg-gps-pin');
    this.gpsGroup.appendChild(pulse);

    const pin = document.createElementNS(svgNS, 'circle');
    pin.setAttribute('cx', x);
    pin.setAttribute('cy', y);
    pin.setAttribute('r', '7');
    pin.setAttribute('fill', '#0284c7');
    pin.setAttribute('stroke', '#ffffff');
    pin.setAttribute('stroke-width', '2');
    this.gpsGroup.appendChild(pin);

    this.panToCoordinate(x, y, 1.4);
  }
}

window.CampusMapEngine = CampusMapEngine;






