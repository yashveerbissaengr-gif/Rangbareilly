import type { Product } from "@/types";

/* ------------------------------------------------------------------ */
/* Category config — canonical slugs used by /category/[slug]          */
/* ------------------------------------------------------------------ */

export interface CategoryMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  rings: {
    slug: "rings",
    title: "Rings",
    description: "Shop beautiful rings — daily-wear, statement & anti-tarnish styles.",
    keywords: ["ring"],
  },
  earrings: {
    slug: "earrings",
    title: "Earrings",
    description: "Shop earrings — jhumkas, dangles, studs & statement styles.",
    keywords: ["earring", "jhumka", "dangle", "stud", "hoop"],
  },
  necklace: {
    slug: "necklace",
    title: "Necklace",
    description: "Shop necklaces — pendants, chains, chokers & layered styles.",
    keywords: ["necklace", "pendant", "chain", "choker", "mala", "neckpiece"],
  },
  bracelets: {
    slug: "bracelets",
    title: "Bracelets",
    description: "Shop bracelets, bangles & kadas for everyday and festive looks.",
    keywords: ["bracelet", "bangle", "kada", "wristlet", "stack"],
  },
  "bag-charms": {
    slug: "bag-charms",
    title: "Bag Charms",
    description: "Shop cute bag charms — cowrie, shell & playful everyday charms.",
    keywords: ["bag charm", "bag-charm", "bagcharm", "charm", "cowrie", "kodi", "shell"],
  },
  "stainless-steel": {
    slug: "stainless-steel",
    title: "Stainless Steel",
    description: "Shop anti-tarnish stainless steel jewellery for daily wear.",
    keywords: ["stainless", "steel", "anti-tarnish", "tarnish", "waterproof"],
  },
  "arm-cuffs": {
    slug: "arm-cuffs",
    title: "Arm Cuffs",
    description: "Shop bold arm cuffs & broad cuffs — festive statement pieces.",
    keywords: ["arm cuff", "arm-cuff", "armcuff", "broad cuff", "cuff", "handcuff"],
  },
};

/* Aliases → canonical category slug (covers /rings, /bagcharms, typos…) */
const CATEGORY_ALIASES: Record<string, string> = {
  rings: "rings",
  ring: "rings",
  earrings: "earrings",
  earring: "earrings",
  earing: "earrings",
  earings: "earrings",
  necklace: "necklace",
  necklaces: "necklace",
  neckpiece: "necklace",
  bracelets: "bracelets",
  bracelet: "bracelets",
  bangle: "bracelets",
  bangles: "bracelets",
  kada: "bracelets",
  "bag-charms": "bag-charms",
  "bag-charm": "bag-charms",
  bagcharms: "bag-charms",
  bagcharm: "bag-charms",
  bag_charms: "bag-charms",
  "stainless-steel": "stainless-steel",
  stainlesssteel: "stainless-steel",
  stainless_steel: "stainless-steel",
  stainlessstell: "stainless-steel", // common typo
  stainless: "stainless-steel",
  steel: "stainless-steel",
  "arm-cuffs": "arm-cuffs",
  "arm-cuff": "arm-cuffs",
  armcuffs: "arm-cuffs",
  armcuff: "arm-cuffs",
  arm_cuffs: "arm-cuffs",
  armcuffes: "arm-cuffs",
};

export function normalizeCategorySlug(raw: string): string | null {
  const key = raw.toLowerCase().trim();
  if (CATEGORIES[key]) return key;
  const aliased = CATEGORY_ALIASES[key];
  if (aliased && CATEGORIES[aliased]) return aliased;
  // also try without dashes/underscores/spaces
  const compact = key.replace(/[-_\s]+/g, "");
  for (const [alias, canonical] of Object.entries(CATEGORY_ALIASES)) {
    if (alias.replace(/[-_\s]+/g, "") === compact) return canonical;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Matching — same logic everywhere (homepage, category, [slug])       */
/* ------------------------------------------------------------------ */

export function productHaystack(p: Product): string {
  return `${p.title ?? ""} ${(p.tags ?? []).join(" ")} ${(p as { productType?: string }).productType ?? ""} ${p.collection ?? ""}`.toLowerCase();
}

export function matchesCategory(p: Product, canonicalSlug: string): boolean {
  const meta = CATEGORIES[canonicalSlug];
  if (!meta) return false;
  const hay = productHaystack(p);
  // "ring" must be a standalone word — otherwise every "earring" falsely matches "rings".
  if (canonicalSlug === "rings") {
    return /\brings?\b/.test(hay) && !/earrings?/.test(hay);
  }
  return meta.keywords.some((k) => hay.includes(k.toLowerCase()));
}

export function filterByCategory(products: Product[], rawSlug: string): { canonical: string | null; filtered: Product[] } {
  const canonical = normalizeCategorySlug(rawSlug);
  if (!canonical) return { canonical: null, filtered: [] };
  return { canonical, filtered: products.filter((p) => matchesCategory(p, canonical)) };
}

/* ------------------------------------------------------------------ */
/* Price filters — "UNDER X" means price <= X (matches homepage)       */
/* ------------------------------------------------------------------ */

export const PRICE_LIMITS = [199, 299, 399, 499] as const;

export function normalizePriceSlug(raw: string): number | null {
  const key = raw.toLowerCase().trim().replace(/^[₹rs.\s]*/, "");
  const m = key.match(/under[-_\s]*(\d{2,4})/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (!Number.isNaN(n)) return n;
  }
  return null;
}

export function filterByPrice(products: Product[], limit: number): Product[] {
  return products.filter((p) => p.price <= limit);
}
