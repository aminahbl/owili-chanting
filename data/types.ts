import type { PlaceId } from './places.ts';

/** Text that differs by the chanter's gender carries both forms. */
export type Text = string | { men: string; women: string };

export interface ChantingLine {
  /** Assigned once and never reused, so timing files can refer to it. */
  id: number;
  pali: Text;
  en?: Text;
  /** Chanted by the leader alone. */
  leader?: true;
  repeat?: number;
}

/** An instruction shown as a cue, not chanted. */
interface CueLine {
  id: number;
  cue: string;
}

export type Line = ChantingLine | CueLine;

export interface Ref {
  label: string;
  /** SuttaCentral text ID, for https://suttacentral.net/<uid>. */
  uid?: string;
}

/** A stanza or paragraph. Refs name the source of the passage that ends here. */
export interface Section {
  title?: string;
  lines: Line[];
  /** The whole section is chanted this many times. */
  repeat?: number;
  refs?: Ref[];
}

/**
 * Where the Pali source places the chant, kept as a record of its own
 * arrangement. The site's categories are in data/groups.ts.
 */
interface PaliSourceCategory {
  category: string;
  subcategory?: string;
  /** Position within the category in the Pali source. */
  order: number;
}

/**
 * open: a question or a known problem that needs attention.
 * changed: the text differs from the Pali source, and the note says how.
 * kept: a possible problem was checked and the text left as it is.
 */
type EditorialStatus = 'open' | 'changed' | 'kept';

/** A record of editorial work on the chant. Not shown on the site. */
interface EditorialNote {
  status: EditorialStatus;
  /** Line IDs the note applies to; absent when it applies to the whole chant. */
  lines?: number[];
  /** Markdown. */
  note: string;
}

export interface Chant {
  /** Four digits, issued from the ledger in data/ids.ts. It never changes. */
  id: string;
  /** The page address, /chants/<slug>. */
  slug: string;
  title: string;
  paliTitle?: string;
  /** Where the Pali text was taken from. The English is our own. */
  paliSource: { label: string; url?: string; categories?: PaliSourceCategory[] };
  translation?: 'draft' | 'reviewed';
  notes?: string[];
  links?: { text: string; href: string }[];
  editorial?: EditorialNote[];
  sections: Section[];
}

/** A sequence of whole chants as a monastery or centre chants it, shown as one page. */
export interface ChantSet {
  /** Four digits, from the same ledger as chants (data/ids.ts). */
  id: string;
  /** The page address, /sets/<slug>. */
  slug: string;
  title: string;
  place: PlaceId;
  /** Position among the place's sets, ascending; gaps are allowed. */
  order: number;
  /** Chant numbers, in the order chanted. */
  chants: string[];
  /** The recording whose chants, order and wording the set follows. */
  anchorRecording: { label: string; url?: string; performers?: string; date?: string };
  links?: { text: string; href: string }[];
}
