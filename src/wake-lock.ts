// Keeps the screen on while lines are advancing. The browser
// releases the lock when the page is hidden, so it is requested again when
// the page becomes visible.
let lock: WakeLockSentinel | null = null;
let wanted = false;

async function request() {
  if (!wanted || lock || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
  try {
    const sentinel = await navigator.wakeLock.request('screen');
    sentinel.addEventListener('release', () => {
      if (lock === sentinel) lock = null;
    });
    lock = sentinel;
    if (!wanted) release();
  } catch {
    // Refused, for example in power-saving mode; the page works without it.
  }
}

function release() {
  lock?.release();
  lock = null;
}

export function keepScreenOn(on: boolean) {
  if (on === wanted) return;
  wanted = on;
  if (on) request();
  else release();
}

document.addEventListener('visibilitychange', request);
