import './components/icons/index.js';
import './components/footer.js';
import { chants } from './data/chants.js';
import { getHandle, saveHandle, verifyPermission, saveBlob, getBlob, deleteHandle, deleteBlob } from './lib/storage.js';

function qs(sel) { return document.querySelector(sel); }
function byId(id) { return document.getElementById(id); }
function getParam(name) { const u = new URL(location.href); return u.searchParams.get(name); }

function setText(el, text) { if (el) el.textContent = text || ''; }

function storageKey(chantId, key) { return `chant:${chantId}:${key}`; }

async function loadChantData(chantId) {
  const meta = chants.find(c => c.id === chantId);
  if (!meta) throw new Error(`Unknown chant id: ${chantId}`);
  const modulePath = `./data/${chantId}.js`;
  const mod = await import(modulePath);
  return { meta, data: mod.chant };
}

function renderChant(chant) {
  setText(qs('title'), `CfSH - ${chant.title}`);
  setText(byId('title'), chant.title);
  const content = byId('content');
  if (!content) return;
  content.innerHTML = '';
  let lineIndex = 0;
  chant.sections.forEach(sec => {
    const wrap = document.createElement('section');
    wrap.className = 'section';
    if (sec.title) {
      const h = document.createElement('h3');
      h.className = 'heading';
      h.textContent = sec.title;
      wrap.appendChild(h);
    }
    sec.items.forEach(it => {
      if (it.note) {
        const p = document.createElement('p');
        p.className = 'note';
        p.textContent = it.note;
        wrap.appendChild(p);
        return;
      }
      const div = document.createElement('div');
      div.className = 'item';
      div.dataset.idx = String(lineIndex);
      div.id = `line-${lineIndex}`;
      if (it.pali) {
        const pali = document.createElement('div');
        pali.className = 'pali';
        pali.textContent = it.pali;
        div.appendChild(pali);
      }
      if (it.en) {
        const en = document.createElement('div');
        en.className = 'en';
        en.textContent = it.en;
        div.appendChild(en);
      }
      wrap.appendChild(div);
      lineIndex += 1;
    });
    content.appendChild(wrap);
  });
}

function initControlsDrawer() {
  const btn = byId('menu-button');
  const pop = byId('controls-drawer');
  const backdrop = byId('drawer-backdrop');
  if (!btn || !pop) return;

  function openPop() {
    pop.classList.add('open');
    pop.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    if (document && document.body) document.body.classList.add('drawer-open');
  }
  function closePop() {
    pop.classList.remove('open');
    pop.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    if (document && document.body) document.body.classList.remove('drawer-open');
  }

  btn.addEventListener('click', () => {
    const isOpen = pop.classList.contains('open');
    if (isOpen) return closePop();
    openPop();
  });

  // Non-modal drawer: allow interacting with page content; don't auto-close on outside clicks
  // Intentionally no outside-click close handler

  document.addEventListener('keydown', (e) => {
    // Ignore if focused in editable fields or when modifiers are pressed
    const t = e.target;
    const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
    const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
    if (inFormField) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    if (e.key === 'Escape') { closePop(); return; }


    if (e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      const isOpen = pop.classList.contains('open');
      if (isOpen) { closePop(); return; }
      openPop();
      return;
    }

    if (e.key === 'q' || e.key === 'Q') {
      e.preventDefault();
      const link = document.querySelector('header.site-header a[aria-label="Home"]');
      const href = link && link.getAttribute('href') ? link.getAttribute('href') : 'index.html';
      if (href) window.location.href = href;
    }
  });

  // Backdrop remains non-interactive in non-modal mode
}

function initScrollControls(chantId) {
  const btn = byId('toggle-scroll');
  const range = byId('speed');
  const readout = byId('speedValue');
  const root = byId('scroll-area') || document.scrollingElement || document.documentElement;
  const audio = byId('audio');
  const markBtn = byId('mark-line');
  const clearMarkersBtn = byId('clear-markers');
  const markersCountEl = byId('markers-count');
  const modeHighlightRadio = byId('mode-highlight');
  const modeScrollRadio = byId('mode-scroll');
  const followActiveEl = byId('follow-active');
  const showMarkersEl = byId('show-markers');
  const followOffsetInput = byId('follow-offset');
  const followOffsetReadout = byId('followOffsetValue');
  const followSpeedInput = byId('follow-speed');
  const followSpeedReadout = byId('followSpeedValue');

  if (!btn || !range || !readout || !root) {
    // eslint-disable-next-line no-console
    console.warn({ msg: 'Scroll controls not initialised', btn: !!btn, range: !!range, readout: !!readout, root: !!root });
    return;
  }

  let speed = Number(localStorage.getItem(storageKey(chantId, 'speed')) || range.value || 15);
  if (Number.isNaN(speed)) speed = 15;
  range.value = String(speed);
  setText(readout, `${speed} px/s`);

  let scrolling = false;
  let rafId = 0;
  let last = 0;
  let acc = 0; // fractional pixel accumulator

  // Cleanup: remove legacy anchors data if present
  try { localStorage.removeItem(storageKey(chantId, 'anchors')); } catch (_) { }


  // Timed markers: [{ t: seconds, idx: lineIndex }]
  function loadMarkers() {
    try {
      const raw = localStorage.getItem(storageKey(chantId, 'markers'));
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.filter(m => m && typeof m.t === 'number' && typeof m.idx === 'number')
        .sort((a, b) => a.t - b.t);
    } catch (_) {
      return [];
    }
  }
  let markers = loadMarkers();
  let markersHistory = [];
  function saveMarkers() {
    try { localStorage.setItem(storageKey(chantId, 'markers'), JSON.stringify(markers)); } catch (_) { }
  }
  function updateMarkersCount() {
    if (!markersCountEl) return;
    setText(markersCountEl, markers.length ? `${markers.length} marker${markers.length === 1 ? '' : 's'}` : '');
  }
  function refreshMarkerDecorations() {
    const items = getItems();
    for (const el of items) {
      el.classList.remove('has-marker');
      el.removeAttribute('data-marker-n');
    }
    for (let i = 0; i < markers.length; i += 1) {
      const m = markers[i];
      const el = byId(`line-${m.idx}`);
      if (!el) continue;
      el.classList.add('has-marker');
      el.setAttribute('data-marker-n', String(m.idx));
    }
  }
  updateMarkersCount();
  refreshMarkerDecorations();

  // Mode handling: 'highlight' or 'scroll'
  const MODE_KEY = storageKey(chantId, 'mode');
  let mode = (localStorage.getItem(MODE_KEY) === 'highlight') ? 'highlight' : 'scroll';
  if (modeHighlightRadio) modeHighlightRadio.checked = mode === 'highlight';
  if (modeScrollRadio) modeScrollRadio.checked = mode === 'scroll';

  // Follow active line (gentle snap) preference
  const FOLLOW_KEY = storageKey(chantId, 'followActive');
  let followActive = localStorage.getItem(FOLLOW_KEY) === '1';
  if (followActiveEl) followActiveEl.checked = followActive;

  // Show markers (gutter ticks) preference
  const SHOW_MARKERS_KEY = storageKey(chantId, 'showMarkers');
  let showMarkers = localStorage.getItem(SHOW_MARKERS_KEY) !== '0';
  if (showMarkersEl) showMarkersEl.checked = showMarkers;
  function applyMarkersVisibility() {
    if (!document || !document.body) return;
    document.body.classList.toggle('markers-hidden', !showMarkers);
  }

  // Follow tuning: offset ratio and max speed
  const FOLLOW_OFFSET_KEY = storageKey(chantId, 'followOffset');
  const FOLLOW_SPEED_KEY = storageKey(chantId, 'followMaxSpeed');
  let followOffset = Number(localStorage.getItem(FOLLOW_OFFSET_KEY) || (followOffsetInput ? followOffsetInput.value : '0.3') || '0.3');
  if (!Number.isFinite(followOffset)) followOffset = 0.3;
  if (followOffset < 0.05) followOffset = 0.05;
  if (followOffset > 0.6) followOffset = 0.6;
  if (followOffsetInput) followOffsetInput.value = String(followOffset);
  if (followOffsetReadout) setText(followOffsetReadout, `${Math.round(followOffset * 100)}%`);

  let followMaxSpeed = Number(localStorage.getItem(FOLLOW_SPEED_KEY) || (followSpeedInput ? followSpeedInput.value : '140') || '140');
  if (!Number.isFinite(followMaxSpeed)) followMaxSpeed = 140;
  if (followMaxSpeed < 60) followMaxSpeed = 60;
  if (followMaxSpeed > 300) followMaxSpeed = 300;
  if (followSpeedInput) followSpeedInput.value = String(followMaxSpeed);
  if (followSpeedReadout) setText(followSpeedReadout, `${followMaxSpeed} px/s`);

  function updateBodyModeClass() {
    if (!document || !document.body) return;
    document.body.classList.remove('mode-highlight', 'mode-scroll');
    document.body.classList.add(mode === 'highlight' ? 'mode-highlight' : 'mode-scroll');
  }

  function applyModeUI() {
    const isScroll = mode === 'scroll';
    if (btn) {
      btn.disabled = !isScroll;
      btn.setAttribute('aria-disabled', String(!isScroll));
      if (!isScroll && scrolling) {
        // Stop any ongoing scroll when leaving scroll mode
        scrolling = false;
        cancelAnimationFrame(rafId);
        btn.textContent = 'Start Scroll';
      }
    }
    if (range) {
      range.disabled = !isScroll;
      range.setAttribute('aria-disabled', String(!isScroll));
    }
    // When entering scroll mode, clear any visual highlight
    if (isScroll) setActiveIndex(-1);
    // When entering highlight mode, sync immediately
    if (!isScroll) updateHighlightForAudioTime();
    updateBodyModeClass();
    updateFollowLoopState();
  }

  function setMode(next) {
    if (next !== 'highlight' && next !== 'scroll') return;
    if (mode === next) return;
    mode = next;
    localStorage.setItem(MODE_KEY, mode);
    if (modeHighlightRadio) modeHighlightRadio.checked = mode === 'highlight';
    if (modeScrollRadio) modeScrollRadio.checked = mode === 'scroll';
    applyModeUI();
    // eslint-disable-next-line no-console
    console.log({ action: 'mode_change', mode });
  }

  if (modeHighlightRadio) modeHighlightRadio.addEventListener('change', () => { if (modeHighlightRadio.checked) setMode('highlight'); });
  if (modeScrollRadio) modeScrollRadio.addEventListener('change', () => { if (modeScrollRadio.checked) setMode('scroll'); });
  if (followActiveEl) followActiveEl.addEventListener('change', () => {
    followActive = !!followActiveEl.checked;
    try { localStorage.setItem(FOLLOW_KEY, followActive ? '1' : '0'); } catch (_) { }
    updateFollowLoopState();
    // eslint-disable-next-line no-console
    console.log({ action: 'follow_toggle', followActive });
  });

  if (showMarkersEl) showMarkersEl.addEventListener('change', () => {
    showMarkers = !!showMarkersEl.checked;
    try { localStorage.setItem(SHOW_MARKERS_KEY, showMarkers ? '1' : '0'); } catch (_) { }
    applyMarkersVisibility();
    // eslint-disable-next-line no-console
    console.log({ action: 'markers_visibility', showMarkers });
  });

  if (followOffsetInput) followOffsetInput.addEventListener('input', () => {
    followOffset = Number(followOffsetInput.value) || 0.3;
    if (followOffset < 0.05) followOffset = 0.05;
    if (followOffset > 0.6) followOffset = 0.6;
    try { localStorage.setItem(FOLLOW_OFFSET_KEY, String(followOffset)); } catch (_) { }
    if (followOffsetReadout) setText(followOffsetReadout, `${Math.round(followOffset * 100)}%`);
    updateFollowLoopState();
    // eslint-disable-next-line no-console
    console.log({ action: 'follow_offset', followOffset });
  });
  if (followSpeedInput) followSpeedInput.addEventListener('input', () => {
    followMaxSpeed = Number(followSpeedInput.value) || 160;
    if (followMaxSpeed < 60) followMaxSpeed = 60;
    if (followMaxSpeed > 300) followMaxSpeed = 300;
    try { localStorage.setItem(FOLLOW_SPEED_KEY, String(followMaxSpeed)); } catch (_) { }
    if (followSpeedReadout) setText(followSpeedReadout, `${followMaxSpeed} px/s`);
    // eslint-disable-next-line no-console
    console.log({ action: 'follow_speed', followMaxSpeed });
  });

  function getItems() {
    return Array.from(document.querySelectorAll('.item'));
  }
  function nearestItemIdxToTop() {
    const items = getItems();
    if (!items.length) return 0;
    const rootTop = root.getBoundingClientRect().top;
    const vh = root.clientHeight || window.innerHeight || 0;
    const targetY = rootTop + Math.max(0, Math.floor(vh * followOffset));
    let bestIdx = 0;
    let bestDist = Infinity;
    for (const el of items) {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5;
      const d = Math.abs(mid - targetY);
      if (d < bestDist) { bestDist = d; bestIdx = Number(el.dataset.idx || '0'); }
    }
    return bestIdx;
  }
  function updateHighlightForAudioTime() {
    if (mode !== 'highlight') { return; }
    if (!audio || !markers.length) { setActiveIndex(-1); return; }
    const tNow = Number(audio.currentTime || 0);
    const idx = findActiveIdxForTime(tNow);
    setActiveIndex(idx >= 0 ? idx : -1);
    // Ensure follow loop can wake up if needed even when idx doesn't change
    updateFollowLoopState();
  }

  function addMarker() {
    if (!audio) return;
    const t = Number(audio.currentTime || 0);
    const idx = nearestItemIdxToTop();
    // replace existing marker for idx if any
    const existing = markers.findIndex(m => m.idx === idx);
    markersHistory.push(JSON.stringify(markers));
    if (existing >= 0) markers.splice(existing, 1);
    markers.push({ t, idx });
    markers.sort((a, b) => a.t - b.t);
    saveMarkers();
    updateMarkersCount();
    updateHighlightForAudioTime();
    refreshMarkerDecorations();
    // eslint-disable-next-line no-console
    console.log({ action: 'marker_add', t, idx, count: markers.length });
  }
  function clearMarkers() {
    if (!markers.length) return;
    markersHistory.push(JSON.stringify(markers));
    markers = [];
    saveMarkers();
    updateMarkersCount();
    updateHighlightForAudioTime();
    refreshMarkerDecorations();
    // eslint-disable-next-line no-console
    console.log({ action: 'marker_clear' });
  }
  function undoLastMarkerChange() {
    if (!markersHistory.length) return;
    const prev = markersHistory.pop();
    try { markers = JSON.parse(prev) || []; } catch (_) { markers = []; }
    saveMarkers();
    updateMarkersCount();
    updateHighlightForAudioTime();
    refreshMarkerDecorations();
    // eslint-disable-next-line no-console
    console.log({ action: 'marker_undo', count: markers.length });
  }

  function findCurrentMarkerIndex() {
    if (!markers.length) return -1;
    if (audio && typeof audio.currentTime === 'number') {
      const t = Number(audio.currentTime || 0);
      let i = 0;
      while (i < markers.length && markers[i].t <= t) i += 1;
      return Math.max(0, Math.min(markers.length - 1, i - 1));
    }
    const baseIdx = lastActiveIdx >= 0 ? lastActiveIdx : nearestItemIdxToTop();
    let bestI = 0;
    let bestD = Infinity;
    for (let i = 0; i < markers.length; i += 1) {
      const d = Math.abs(markers[i].idx - baseIdx);
      if (d < bestD) { bestD = d; bestI = i; }
    }
    return bestI;
  }

  function gotoMarkerAt(i) {
    if (!markers.length) return;
    const clamped = Math.max(0, Math.min(i, markers.length - 1));
    const m = markers[clamped];
    if (audio && typeof audio.currentTime === 'number') audio.currentTime = m.t;
    setActiveIndex(m.idx);
    const vh = root.clientHeight || window.innerHeight || 0;
    const offset = Math.max(0, Math.floor(vh * followOffset));
    const top = targetScrollForItem(m.idx, offset);
    root.scrollTop = top;
    // eslint-disable-next-line no-console
    console.log({ action: 'marker_nav', to: clamped, idx: m.idx, t: m.t });
  }
  function gotoPrevMarker() {
    if (!markers.length) return;
    const cur = findCurrentMarkerIndex();
    const next = Math.max(0, cur - 1);
    gotoMarkerAt(next);
  }
  function gotoNextMarker() {
    if (!markers.length) return;
    const cur = findCurrentMarkerIndex();
    const next = Math.min(markers.length - 1, cur + 1);
    gotoMarkerAt(next);
  }
  const prevBtn = byId('prev-marker');
  const nextBtn = byId('next-marker');
  const undoBtn = byId('undo-marker');
  const exportBtn = byId('export-markers');
  const importBtn = byId('import-markers');
  const importFile = byId('import-file');

  if (markBtn) markBtn.addEventListener('click', addMarker);
  if (clearMarkersBtn) clearMarkersBtn.addEventListener('click', clearMarkers);
  if (prevBtn) prevBtn.addEventListener('click', gotoPrevMarker);
  if (nextBtn) nextBtn.addEventListener('click', gotoNextMarker);
  if (undoBtn) undoBtn.addEventListener('click', undoLastMarkerChange);

  function exportMarkers() {
    const payload = { id: chantId, markers };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chantId}-markers.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
    // eslint-disable-next-line no-console
    console.log({ action: 'marker_export', count: markers.length });
  }
  function importMarkersFromFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(String(reader.result || ''));
        const arr = Array.isArray(json) ? json : json && Array.isArray(json.markers) ? json.markers : [];
        const incoming = arr.filter(m => m && typeof m.t === 'number' && typeof m.idx === 'number')
          .sort((a, b) => a.t - b.t);
        markersHistory.push(JSON.stringify(markers));
        markers = incoming;
        saveMarkers();
        updateMarkersCount();
        updateHighlightForAudioTime();
        refreshMarkerDecorations();
        // eslint-disable-next-line no-console
        console.log({ action: 'marker_import', count: markers.length });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn({ action: 'marker_import_error' });
      }
    };
    reader.readAsText(file);
  }
  if (exportBtn) exportBtn.addEventListener('click', exportMarkers);
  if (importBtn) importBtn.addEventListener('click', () => { if (importFile) importFile.click(); });
  if (importFile) importFile.addEventListener('change', () => { const f = importFile.files && importFile.files[0]; importMarkersFromFile(f); importFile.value = ''; });

  let lastActiveIdx = -1;
  function setActiveIndex(idx) {
    if (idx === lastActiveIdx) return;
    const items = getItems();
    if (lastActiveIdx >= 0 && lastActiveIdx < items.length) items[lastActiveIdx].classList.remove('active');
    if (idx >= 0 && idx < items.length) items[idx].classList.add('active');
    lastActiveIdx = idx;
    updateFollowLoopState();
    // Reset follow velocity to avoid carrying momentum across segment switches
    followVel = 0;
  }
  function findActiveIdxForTime(t) {
    if (!markers.length) return -1;
    let i = 0;
    while (i < markers.length && markers[i].t <= t) i += 1;
    if (i === 0) return markers[0].idx;
    return markers[i - 1].idx;
  }
  function targetScrollForItem(idx, offsetPx = 60) {
    const items = getItems();
    if (!items.length) return root.scrollTop || 0;
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    const el = items[clamped];
    const rootTop = root.getBoundingClientRect().top;
    const itTop = el.getBoundingClientRect().top;
    const current = root.scrollTop || 0;
    const delta = itTop - rootTop;
    return current + delta - offsetPx;
  }

  // Continuous gentle follow loop keeping active line nearer the top
  // followOffset is user-configurable via the controls drawer
  let followRAF = 0;
  let lastFollowTs = 0;
  let followVel = 0; // px/s spring velocity
  let followSuppressUntil = 0;
  let followSuppressTimer = 0;
  function isFollowSuppressed() { return Date.now() < followSuppressUntil; }
  function suppressFollow(ms = 1600) {
    followSuppressUntil = Date.now() + ms;
    if (followSuppressTimer) clearTimeout(followSuppressTimer);
    followSuppressTimer = window.setTimeout(() => {
      followSuppressTimer = 0;
      updateFollowLoopState();
    }, ms + 30);
  }
  function followLoop(ts) {
    if (mode !== 'highlight' || !followActive || lastActiveIdx < 0) { followRAF = 0; return; }
    if (!lastFollowTs) lastFollowTs = ts;
    const dt = Math.max(0.001, (ts - lastFollowTs) / 1000);
    lastFollowTs = ts;

    if (isFollowSuppressed()) { followRAF = requestAnimationFrame(followLoop); return; }

    const vh = root.clientHeight || window.innerHeight || 0;
    const offset = Math.max(0, Math.floor(vh * followOffset));
    const target = targetScrollForItem(lastActiveIdx, offset);
    const current = root.scrollTop || 0;
    const error = target - current;
    // Critically-damped spring-like smoothing
    const maxSpeed = followMaxSpeed; // px/s cap for gentleness
    const stiffness = 8.0; // spring constant
    const damping = 12.0; // damping constant
    const accel = (error * stiffness) - (followVel * damping);
    followVel += accel * dt;
    let step = followVel * dt;
    const maxStep = maxSpeed * dt;
    if (step > maxStep) step = maxStep;
    if (step < -maxStep) step = -maxStep;
    if (Math.abs(step) < 0.05 && Math.abs(error) < 0.5) followVel = 0; // avoid micro jitter
    const before = root.scrollTop || 0;
    root.scrollTop = before + step;
    if (root.scrollTop === before && typeof root.scrollBy === 'function') window.scrollBy(0, step);
    followRAF = requestAnimationFrame(followLoop);
  }
  function ensureFollowLoop() {
    if (followRAF) return;
    if (mode !== 'highlight') return;
    if (!followActive) return;
    if (lastActiveIdx < 0) return;
    lastFollowTs = 0;
    followRAF = requestAnimationFrame(followLoop);
  }
  function stopFollowLoop() {
    if (!followRAF) return;
    cancelAnimationFrame(followRAF);
    followRAF = 0;
    lastFollowTs = 0;
    followVel = 0;
  }
  function updateFollowLoopState() {
    if (mode === 'highlight' && followActive && lastActiveIdx >= 0) { ensureFollowLoop(); return; }
    stopFollowLoop();
  }

  // Pause follow on user-driven scroll interactions to make initial marker placement easier
  const onUserScrollIntent = () => { if (mode === 'highlight' && followActive) suppressFollow(1600); };
  root.addEventListener('wheel', onUserScrollIntent, { passive: true });
  root.addEventListener('touchstart', onUserScrollIntent, { passive: true });
  root.addEventListener('touchmove', onUserScrollIntent, { passive: true });
  root.addEventListener('pointerdown', onUserScrollIntent, { passive: true });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End') onUserScrollIntent();
  });

  function step(ts) {
    if (!scrolling) return;
    if (!last) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;
    // Pure auto-scroll; markers are ignored in scroll mode
    const dy = speed * dt;
    acc += dy;
    const inc = Math.floor(acc);
    if (inc > 0) {
      acc -= inc;
      const before = root.scrollTop;
      root.scrollTop = before + inc;
      if (root.scrollTop === before && typeof window.scrollBy === 'function') window.scrollBy(0, inc);
    }

    const docEl = document.documentElement;
    const body = document.body;
    const top = root.scrollTop || 0;
    const height = root.scrollHeight || docEl.scrollHeight || body.scrollHeight || 0;
    const viewport = root.clientHeight || window.innerHeight || docEl.clientHeight || 0;
    const atBottom = (top + viewport) >= (height - 1);
    if (atBottom) {
      scrolling = false;
      btn.textContent = 'Start Scroll';
      return;
    }
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (scrolling) return;
    if (speed <= 0) {
      speed = 20;
      range.value = String(speed);
      localStorage.setItem(storageKey(chantId, 'speed'), String(speed));
      setText(readout, `${speed} px/s`);
    }
    scrolling = true;
    last = 0;
    rafId = requestAnimationFrame(step);
    btn.textContent = 'Pause Scroll';
    // eslint-disable-next-line no-console
    console.log({ action: 'scroll_start', speed });
  }

  function stop() {
    if (!scrolling) return;
    scrolling = false;
    cancelAnimationFrame(rafId);
    btn.textContent = 'Start Scroll';
    // eslint-disable-next-line no-console
    console.log({ action: 'scroll_stop' });
  }

  btn.addEventListener('click', () => { scrolling ? stop() : start(); });

  range.addEventListener('input', () => {
    speed = Number(range.value);
    localStorage.setItem(storageKey(chantId, 'speed'), String(speed));
    setText(readout, `${speed} px/s`);
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (mode === 'highlight') {
        const t = e.target;
        const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
        const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
        if (inFormField) return;
        e.preventDefault();
        if (audio) { audio.paused ? audio.play() : audio.pause(); }
        return;
      }
      return;
    }
    if (e.key === 's' || e.key === 'S') {
      if (mode === 'scroll') {
        e.preventDefault();
        scrolling ? stop() : start();
      }
      return;
    }
    if (e.key === 'l' || e.key === 'L') {
      const t = e.target;
      const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
      const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
      if (inFormField) return;
      e.preventDefault();
      if (followActiveEl) {
        followActiveEl.checked = !followActiveEl.checked;
        followActiveEl.dispatchEvent(new Event('change'));
      }
      return;
    }
    if (e.altKey && (e.key === '1' || e.code === 'Digit1')) {
      const t = e.target;
      const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
      const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
      if (inFormField) return;
      e.preventDefault();
      const nextMode = mode === 'highlight' ? 'scroll' : 'highlight';
      setMode(nextMode);
      return;
    }
    // Home: jump to top of chant text
    if (e.key === 'h' || e.key === 'H') {
      const t = e.target;
      const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
      const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
      if (inFormField) return;
      e.preventDefault();
      if (mode === 'highlight' && followActive) suppressFollow(1200);
      root.scrollTop = 0;
      return;
    }
    // Arrow keys: scroll the chant text up/down
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const t = e.target;
      const tag = t && t.tagName ? String(t.tagName).toUpperCase() : '';
      const inFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable);
      if (inFormField) return;
      e.preventDefault();
      const baseStep = 60;
      const step = e.shiftKey ? baseStep * 3 : baseStep;
      const dir = e.key === 'ArrowUp' ? -1 : 1;
      const before = root.scrollTop || 0;
      if (mode === 'highlight' && followActive) suppressFollow(1200);
      root.scrollTop = before + dir * step;
      return;
    }
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      addMarker();
      return;
    }
    if (e.key === 'x' || e.key === 'X') {
      e.preventDefault();
      clearMarkers();
    }
    if (e.key === 'z' || e.key === 'Z') {
      e.preventDefault();
      undoLastMarkerChange();
      return;
    }
    if (e.key === 'j' || e.key === 'J') {
      e.preventDefault();
      gotoPrevMarker();
      return;
    }
    if (e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      gotoNextMarker();
    }
  });

  // Drive highlighting from audio time in highlight mode
  if (audio) {
    audio.addEventListener('timeupdate', updateHighlightForAudioTime);
    audio.addEventListener('seeked', updateHighlightForAudioTime);
    audio.addEventListener('play', updateHighlightForAudioTime);
  }

  // Apply initial mode state
  applyModeUI();
  updateHighlightForAudioTime();
  applyMarkersVisibility();
  refreshMarkerDecorations();
}

function supportsFS() {
  return 'showOpenFilePicker' in window;
}

async function initAudio(chantId) {
  const audio = byId('audio');
  const pickBtn = byId('pick-audio');
  const input = byId('file-input');
  const nameEl = byId('audioName');
  const removeBtn = byId('remove-audio');

  function setName(name) { setText(nameEl, name ? `Audio: ${name}` : ''); }
  function setBtnLabel(hasAudio) { pickBtn.ariaLabel = hasAudio ? 'Change audio' : 'Select audio'; }
  function setBtnGrantAccess() { pickBtn.textContent = 'Grant access'; }
  function showRemove(show) { if (removeBtn) removeBtn.style.display = show ? '' : 'none'; }

  async function clearSaved() {
    await Promise.allSettled([
      deleteHandle(chantId),
      deleteBlob(chantId),
    ]);
    localStorage.removeItem(storageKey(chantId, 'lastFileName'));
  }

  async function loadFromHandle(handle) {
    if (!handle) return false;
    const ok = await verifyPermission(handle, 'read');
    if (!ok) return false;
    const file = await handle.getFile();
    const url = URL.createObjectURL(file);
    audio.src = url;
    setName(file.name);
    setBtnLabel(true);
    return true;
  }

  let remembered = null;
  let rememberedPermission = 'denied';

  if (supportsFS()) {
    remembered = await getHandle(chantId).catch(() => null);
    if (remembered && 'queryPermission' in remembered) {
      rememberedPermission = await remembered.queryPermission({ mode: 'read' });
    } else if (remembered) {
      rememberedPermission = 'granted';
    }

    if (rememberedPermission === 'granted') {
      const loaded = await loadFromHandle(remembered);
      if (!loaded) { setBtnLabel(false); showRemove(!!remembered); }
      if (loaded) {
        showRemove(true);
        // Prefer handle; remove blob/local name if any
        try { await deleteBlob(chantId); } catch (_) { }
        localStorage.removeItem(storageKey(chantId, 'lastFileName'));
      }
    }
    if (!remembered || rememberedPermission !== 'granted') {
      if (remembered) setName('Permission needed to access previously selected audio');
      if (remembered) setBtnGrantAccess();
      if (!remembered) setBtnLabel(false);
      // Try Firefox-style blob fallback even if FS API exists but permission is not granted
      try {
        const entry = await getBlob(chantId);
        if (entry && entry.blob) {
          const url = URL.createObjectURL(entry.blob);
          audio.src = url;
          setName(entry.name || 'Saved audio');
          setBtnLabel(true);
          showRemove(true);
        }
      } catch (_) { /* noop */ }
      if (!audio.src) showRemove(!!remembered);
    }
  } else {
    const lastName = localStorage.getItem(storageKey(chantId, 'lastFileName'));
    if (lastName) { setName(lastName); setBtnLabel(true); showRemove(true); }
    if (!lastName) setBtnLabel(false);
    // Firefox fallback: load from IndexedDB blob if available
    try {
      const entry = await getBlob(chantId);
      if (entry && entry.blob) {
        const url = URL.createObjectURL(entry.blob);
        audio.src = url;
        setName(entry.name || lastName || 'Saved audio');
        setBtnLabel(true);
        showRemove(true);
      }
    } catch (_) { /* noop */ }
    if (!audio.src && !lastName) showRemove(false);
  }

  pickBtn.addEventListener('click', async () => {
    if (!supportsFS()) {
      input.click();
      return;
    }
    // If we have a remembered handle but permission is not yet granted, request it first
    if (remembered && rememberedPermission !== 'granted') {
      try {
        const status = await remembered.requestPermission({ mode: 'read' });
        rememberedPermission = status;
        if (status === 'granted') {
          const ok = await loadFromHandle(remembered);
          if (ok) {
            await saveHandle(chantId, remembered);
            // Prefer handle; remove blob/local name
            try { await deleteBlob(chantId); } catch (_) { }
            localStorage.removeItem(storageKey(chantId, 'lastFileName'));
            showRemove(true);
            rememberedPermission = 'granted';
            return;
          }
        }
      } catch (_) {
        // fall through to picker
      }
    }
    try {
      const [handle] = await window.showOpenFilePicker({
        id: `chant-audio-${chantId}`,
        types: [{ description: 'Audio', accept: { 'audio/*': ['.mp3', '.m4a', '.wav', '.ogg', '.flac'] } }],
        excludeAcceptAllOption: false,
        multiple: false,
      });
      const ok = await loadFromHandle(handle);
      if (ok) {
        await clearSaved(); // remove previous selections across stores
        await saveHandle(chantId, handle);
        showRemove(true);
        // Update in-memory remembered state
        remembered = handle;
        rememberedPermission = 'granted';
      }
    } catch (e) {
      // user cancelled or error
    }
  });

  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    audio.src = url;
    setName(file.name);
    localStorage.setItem(storageKey(chantId, 'lastFileName'), file.name);
    setBtnLabel(true);
    // Persist a copy as blob for Firefox and as a fallback when FS permission isn't available
    (async () => {
      try {
        await clearSaved(); // remove previous selections across stores
        await saveBlob(chantId, file, file.name);
        showRemove(true);
      } catch (_) { }
    })();
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', async () => {
      await clearSaved();
      audio.removeAttribute('src');
      audio.load();
      setName('');
      setBtnLabel(false);
      showRemove(false);
      // Reset in-memory remembered state
      remembered = null;
      rememberedPermission = 'denied';
    });
  }
}

async function main() {
  const chantId = getParam('id') || 'morning-chanting';
  const { data } = await loadChantData(chantId);
  renderChant(data);
  initControlsDrawer();
  initScrollControls(chantId);
  initAudio(chantId);
}

function boot() {
  main().catch(err => {
    // eslint-disable-next-line no-console
    console.error({ err });
    const c = byId('content');
    if (c) c.innerHTML = '<p class="note">Failed to load chant.</p>';
  });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
