import { Product } from "@/types";

export type ProductTypeCategory =
  | "bangles_kadas"
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "watches"
  | "rings"
  | "fabric_ethnic"
  | "bag_charms"
  | "general_jewelry";

export interface HighlightBadge {
  id: string;
  iconName: "anti-tarnish" | "skin-safe" | "gold-plated" | "silver-finish" | "feather-light" | "quartz" | "water-resistant" | "handcrafted" | "mirror-work" | "adjustable";
  label: string;
}

export interface ProductDeal {
  tag: string;
  discountedPrice: number;
  couponCode: string;
  conditionText: string;
  subNote: string;
  allDeals: Array<{
    code: string;
    title: string;
    description: string;
    minSpend?: number;
  }>;
}

export interface GiftSleeveOption {
  title: string;
  label: string;
  price: number;
  imageUrl: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface ProductPalmonasSettings {
  categoryType: ProductTypeCategory;
  categoryLabel: string;
  calculatedMrp: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  sku: string;
  recentSales7Days: number;
  inStock: boolean;
  stockCount: number;
  highlightBadges: HighlightBadge[];
  deal: ProductDeal;
  giftSleeve: GiftSleeveOption;
  availableFinishes: string[];
  availableSizes: string[];
  descriptionHtml: string;
  specs: SpecItem[];
  supplierInfo: SpecItem[];
  returnsInfo: {
    returnDays: number;
    exchangeDays: number;
    description: string[];
  };
}

/**
 * Deterministic pseudo-random number generator based on string seed.
 * Ensures stable values (reviews, sold counts) per product.
 */
function pseudoHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Detect product category type from title, tags, and productType.
 */
export function detectProductCategory(product: Product): ProductTypeCategory {
  const text = `${product.title} ${product.productType || ""} ${(product.tags || []).join(" ")} ${product.collection || ""} ${product.slug || ""}`.toLowerCase();

  if (text.includes("watch") || text.includes("quartz") || text.includes("timepiece")) {
    return "watches";
  }
  if (text.includes("mirror") || text.includes("kutch") || text.includes("fabric") || text.includes("abhla") || text.includes("navratri") || text.includes("shell") || text.includes("kodi") || text.includes("cowrie")) {
    return "fabric_ethnic";
  }
  if (text.includes("bangle") || text.includes("kada") || text.includes("cuff") || text.includes("wristlet") || text.includes("handcuff") || text.includes("choodi")) {
    return "bangles_kadas";
  }
  if (text.includes("earring") || text.includes("jhumka") || text.includes("dangle") || text.includes("stud") || text.includes("hoop")) {
    return "earrings";
  }
  if (text.includes("necklace") || text.includes("choker") || text.includes("pendant") || text.includes("chain") || text.includes("mala")) {
    return "necklaces";
  }
  if (text.includes("ring") && !text.includes("earring")) {
    return "rings";
  }
  if (text.includes("bracelet") || text.includes("tennis")) {
    return "bracelets";
  }
  if (text.includes("charm") || text.includes("keychain") || text.includes("bagcharm")) {
    return "bag_charms";
  }

  return "general_jewelry";
}

/**
 * Generates full Palmonas-style settings tailored specifically to each product.
 */
export function getProductPalmonasSettings(product: Product): ProductPalmonasSettings {
  const categoryType = detectProductCategory(product);
  const seed = pseudoHash(product.id || product.slug || product.title);

  // Price calculations
  const price = product.price > 0 ? product.price : 0;
  const calculatedMrp = product.compareAtPrice && product.compareAtPrice > price 
    ? product.compareAtPrice 
    : price;
  const discountPercent = calculatedMrp > price ? Math.round(((calculatedMrp - price) / calculatedMrp) * 100) : 0;

  // Reviews and Social Proof (Removed fake details)
  const rating = 0;
  const reviewCount = 0;
  const recentSales7Days = 0;

  // SKU derivation
  const skuPrefix = {
    bangles_kadas: "BG",
    earrings: "ER",
    necklaces: "NK",
    bracelets: "BR",
    watches: "WT",
    rings: "RN",
    fabric_ethnic: "FE",
    bag_charms: "CH",
    general_jewelry: "RB",
  }[categoryType];
  const skuSuffix = (seed % 900 + 100).toString();
  const sku = product.variants?.[0]?.sku || `RB-${skuPrefix}${skuSuffix}-G`;

  // Stock
  const stockCount = 0;
  const inStock = product.variants?.[0]?.stock !== 0;

  // Highlight Badges per Category
  const highlightBadges: HighlightBadge[] = [];

  // Deals configuration
  const discountedPrice = Math.max(199, Math.round(price * 0.75));
  const deal: ProductDeal = {
    tag: "",
    discountedPrice: 0,
    couponCode: "",
    conditionText: "",
    subNote: "",
    allDeals: [],
  };

  // Gift sleeve option
  const giftSleeve: GiftSleeveOption = {
    title: "",
    label: "",
    price: 0,
    imageUrl: "",
  };

  // Variant finishes & sizes
  const availableFinishes: string[] = [];
  const availableSizes: string[] = [];

  // Specifications
  const specs: SpecItem[] = [];
  if (product.productType) {
    specs.push({ label: "Product Type", value: product.productType });
  }
  if (product.tags && product.tags.length > 0) {
    specs.push({ label: "Tags", value: product.tags.join(", ") });
  }

  // Supplier Information
  const supplierInfo: SpecItem[] = [
    { label: "Marketed By", value: "Rangbareilly Lifestyle & Retail Pvt. Ltd." },
    { label: "Country of Origin", value: "India 🇮🇳" },
  ];

  // Returns Information
  const returnsInfo = {
    returnDays: 2,
    exchangeDays: 10,
    description: [
      "2-Day Hassle-Free Return Policy: If you are not completely in love with your piece, initiate a return within 48 hours of delivery.",
      "10-Day Seamless Exchange: Exchange for any size or alternative design across our entire catalog within 10 days.",
      "Doorstep Reverse Pickup: Fast, free courier pickup scheduled right from your address.",
    ],
  };

  // Description HTML / text
  const categoryLabel = {
    bangles_kadas: "Bangle & Kada Collection",
    earrings: "Earrings Collection",
    necklaces: "Necklaces & Pendants",
    bracelets: "Bracelets & Wristlets",
    watches: "Watches & Timepieces",
    rings: "Rings Collection",
    fabric_ethnic: "Tribal & Kutchi Ethnic Collection",
    bag_charms: "Charms & Accessories",
    general_jewelry: "Everyday Luxury Jewellery",
  }[categoryType];

  const descriptionHtml = product.descriptionHtml && product.descriptionHtml.trim().length > 0
    ? product.descriptionHtml
    : product.description && product.description.trim().length > 0
    ? `<p>${product.description}</p>`
    : `<p>${product.title}</p>`;

  return {
    categoryType,
    categoryLabel,
    calculatedMrp,
    discountPercent,
    rating,
    reviewCount,
    sku,
    recentSales7Days,
    inStock,
    stockCount,
    highlightBadges,
    deal,
    giftSleeve,
    availableFinishes,
    availableSizes,
    descriptionHtml,
    specs,
    supplierInfo,
    returnsInfo,
  };
}
