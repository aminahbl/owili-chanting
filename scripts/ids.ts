import { ids as ledger } from '../data/ids.ts';

/**
 * Stops the build unless the numbers given to chants (and later sets) match the
 * ledger in data/ids.ts: every number issued once, in ascending order, each
 * used by exactly one item with the slug the ledger gives, and none retired.
 */
export function checkIds(items: { id: string; slug: string }[]): void {
  const problems: string[] = [];
  let previous = '';
  for (const entry of ledger) {
    if (!/^\d{4}$/.test(entry.id)) problems.push(`${entry.id} is not four digits.`);
    else if (entry.id <= previous) problems.push(`${entry.id} is repeated or out of order.`);
    previous = entry.id;
  }
  const issued = new Map(ledger.map((e) => [e.id, e]));
  const used = new Set<string>();
  const slugs = new Set<string>();
  for (const { id, slug } of items) {
    const entry = issued.get(id);
    if (!entry) problems.push(`${slug} has the number ${id}, which is not in the ledger.`);
    else if (entry.retired) problems.push(`${slug} has the number ${id}, which is retired.`);
    else if (entry.slug !== slug) problems.push(`${id} belongs to ${entry.slug} in the ledger, but is given to ${slug}.`);
    if (used.has(id)) problems.push(`${id} is given to more than one chant or set.`);
    if (slugs.has(slug)) problems.push(`The slug ${slug} is used more than once.`);
    used.add(id);
    slugs.add(slug);
  }
  for (const entry of ledger) {
    if (!entry.retired && !used.has(entry.id)) problems.push(`${entry.id} (${entry.slug}) has no chant or set; mark it retired.`);
  }
  if (problems.length) throw new Error(`data/ids.ts:\n${problems.join('\n')}`);
}
