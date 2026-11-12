import { readFileSync } from 'node:fs';
import { posix } from 'node:path';

const src = new URL('../src/', import.meta.url);
// Static and dynamic imports of a module in src/. Type-only imports are erased
// when compiled, so they are not followed.
const IMPORT = /^import\s+(?!type\s)(?:[^'"]*\sfrom\s+)?'(\.[^']+)\.ts';|\bimport\('(\.[^']+)\.ts'\)/gm;

const found = new Map<string, string[]>();

function importsOf(module: string): string[] {
  let list = found.get(module);
  if (!list) {
    const text = readFileSync(new URL(`${module}.ts`, src), 'utf8');
    list = [...text.matchAll(IMPORT)].map((m) => posix.join(posix.dirname(module), m[1] ?? m[2]));
    found.set(module, list);
  }
  return list;
}

/** The modules that the entry modules load, without the entries, as names in src/ such as "icons/home". */
export function dependencies(entries: string[]): string[] {
  const seen = new Set<string>();
  const visit = (module: string) => {
    for (const next of importsOf(module)) {
      if (seen.has(next)) continue;
      seen.add(next);
      visit(next);
    }
  };
  entries.forEach(visit);
  return [...seen].filter((m) => !entries.includes(m));
}
