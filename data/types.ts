import type { GroupId } from './groups.ts';

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
  refs?: Ref[];
}

interface Membership {
  group: GroupId;
  subgroup?: string;
  /**
   * Position in the group's list, ascending. It is compared only with the
   * other chants in the same group; gaps are allowed.
   */
  order: number;
}

/**
 * Where the source places the chant, kept as a record of the source's own
 * arrangement. The site's categories are in `groups`.
 */
interface SourceCategory {
  category: string;
  subcategory?: string;
  /** Position within the category in the source. */
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
  id: string;
  title: string;
  paliTitle?: string;
  groups: Membership[];
  /** Where the Pali text was taken from. The English is our own. */
  paliSource: { label: string; url?: string; categories?: SourceCategory[] };
  translation?: 'draft' | 'reviewed';
  notes?: string[];
  links?: { text: string; href: string }[];
  editorial?: EditorialNote[];
  sections: Section[];
}
