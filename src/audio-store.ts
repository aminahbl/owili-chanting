// The user's audio file, remembered per chant in IndexedDB.
// Where the browser can keep a handle to a file on the device (the File System
// Access API, in Chromium browsers), only the handle is kept, and the browser
// asks again for permission to read the file on a later visit. Other browsers
// keep a copy of the file.

export interface AudioHandle {
  name: string;
  getFile(): Promise<File>;
  queryPermission?(options: { mode: 'read' }): Promise<PermissionState>;
  requestPermission?(options: { mode: 'read' }): Promise<PermissionState>;
}

type SavedAudio = { handle: AudioHandle } | { file: File };

interface FilePickerWindow {
  showOpenFilePicker?(options: object): Promise<AudioHandle[]>;
}

const EXTENSIONS = ['.mp3', '.m4a', '.aac', '.ogg', '.oga', '.opus', '.wav', '.flac', '.webm'];

/** True where the browser can keep a handle to the file instead of a copy. */
export const keepsHandles = typeof (window as FilePickerWindow).showOpenFilePicker === 'function';

/** Opens the browser's file picker for an audio file; null if the user cancels. */
export async function pickAudio(): Promise<AudioHandle | null> {
  try {
    const picker = window as FilePickerWindow;
    const [handle] = (await picker.showOpenFilePicker?.({ types: [{ description: 'Audio', accept: { 'audio/*': EXTENSIONS } }] })) ?? [];
    return handle ?? null;
  } catch {
    return null;
  }
}

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('audio', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = action(db.transaction('files', mode).objectStore('files'));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

// Storage can be unavailable, for example in some private windows; the file is then not remembered.
export function readAudio(chantId: string): Promise<SavedAudio | undefined> {
  return run<SavedAudio | undefined>('readonly', (store) => store.get(chantId)).catch(() => undefined);
}

export function saveAudio(chantId: string, saved: SavedAudio): Promise<void> {
  return run('readwrite', (store) => store.put(saved, chantId)).then(
    () => {},
    () => {},
  );
}

export function forgetAudio(chantId: string): Promise<void> {
  return run('readwrite', (store) => store.delete(chantId)).then(
    () => {},
    () => {},
  );
}
