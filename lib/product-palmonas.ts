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

  // Reviews and Social Proof
  const rating = 4.7 + ((seed % 4) * 0.1);
  const reviewCount = 280 + (seed % 650);
  const recentSales7Days = 1200 + (seed % 2400);

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
  const sku = `RB-${skuPrefix}${skuSuffix}-G`;

  // Stock
  const stockCount = 8 + (seed % 45);
  const inStock = product.variants?.[0]?.stock !== 0;

  // Highlight Badges per Category
  let highlightBadges: HighlightBadge[] = [];
  switch (categoryType) {
    case "watches":
      highlightBadges = [
        { id: "1", iconName: "quartz", label: "Japanese Quartz" },
        { id: "2", iconName: "water-resistant", label: "Water Resistant 3ATM" },
        { id: "3", iconName: "anti-tarnish", label: "Stainless Steel Back" },
      ];
      break;
    case "fabric_ethnic":
      highlightBadges = [
        { id: "1", iconName: "handcrafted", label: "100% Handcrafted" },
        { id: "2", iconName: "mirror-work", label: "Authentic Mirror Work" },
        { id: "3", iconName: "skin-safe", label: "Skin Safe Fabric" },
      ];
      break;
    case "earrings":
      highlightBadges = [
        { id: "1", iconName: "feather-light", label: "Feather-Light (12g)" },
        { id: "2", iconName: "skin-safe", label: "Hypoallergenic Posts" },
        { id: "3", iconName: "anti-tarnish", label: "Anti-Tarnish Finish" },
      ];
      break;
    case "necklaces":
      highlightBadges = [
        { id: "1", iconName: "anti-tarnish", label: "Anti-Tarnish" },
        { id: "2", iconName: "skin-safe", label: "Skin Safe Jewellery" },
        { id: "3", iconName: "gold-plated", label: "18K Gold Tone Plated" },
      ];
      break;
    case "rings":
      highlightBadges = [
        { id: "1", iconName: "adjustable", label: "Adjustable Free Size" },
        { id: "2", iconName: "anti-tarnish", label: "Anti-Tarnish" },
        { id: "3", iconName: "skin-safe", label: "Skin Safe Jewellery" },
      ];
      break;
    case "bangles_kadas":
      highlightBadges = [
        { id: "1", iconName: "anti-tarnish", label: "Anti-Tarnish" },
        { id: "2", iconName: "skin-safe", label: "Skin Safe Jewellery" },
        { id: "3", iconName: "gold-plated", label: "18K Gold Tone Plated" },
      ];
      break;
    default:
      highlightBadges = [
        { id: "1", iconName: "anti-tarnish", label: "Anti-Tarnish" },
        { id: "2", iconName: "skin-safe", label: "Skin Safe Jewellery" },
        { id: "3", iconName: "gold-plated", label: "18K Gold Tone Plated" },
      ];
  }

  // Deals configuration
  const discountedPrice = Math.max(199, Math.round(price * 0.75));
  const deal: ProductDeal = {
    tag: "OFFER ENDING SOON",
    discountedPrice,
    couponCode: "STACK4",
    conditionText: "Buy 4 for ₹2999",
    subNote: "Note: You need to add minimum 4 products.",
    allDeals: [
      {
        code: "STACK4",
        title: "Stack Up Fest",
        description: "Buy any 4 jewellery pieces for ₹2,999. Mix and match freely across the store!",
      },
      {
        code: "RANG10",
        title: "Welcome Offer",
        description: "Get an extra 10% instant discount on all prepaid orders (UPI / Cards).",
      },
      {
        code: "FESTIVE200",
        title: "Festive Glam Offer",
        description: "Flat ₹200 OFF on orders above ₹1,499. Applied at checkout automatically.",
        minSpend: 1499,
      },
      {
        code: "FREESHIP",
        title: "Free Express Shipping",
        description: "Zero delivery charges on all orders with insured courier dispatch across India.",
      },
    ],
  };

  // Gift sleeve option
  let giftSleeve: GiftSleeveOption;
  if (categoryType === "watches") {
    giftSleeve = {
      title: "Add a gift sleeve",
      label: "Add Watch Hardcase & Birthday Sleeve — ₹ 80.00",
      price: 80,
      imageUrl: "/images/gift-sleeve.jpg",
    };
  } else if (categoryType === "fabric_ethnic" || categoryType === "bangles_kadas") {
    giftSleeve = {
      title: "Add a gift sleeve",
      label: "Add Birthday sleeve — ₹ 50.00",
      price: 50,
      imageUrl: "/images/gift-sleeve.jpg",
    };
  } else {
    giftSleeve = {
      title: "Add a gift sleeve",
      label: "Add Birthday sleeve — ₹ 50.00",
      price: 50,
      imageUrl: "/images/gift-sleeve.jpg",
    };
  }

  // Variant finishes & sizes
  let availableFinishes: string[] = ["GOLD", "SILVER", "ROSE GOLD"];
  if (categoryType === "fabric_ethnic") {
    availableFinishes = ["MULTI COLOR", "ROYAL RED", "FESTIVE GOLD"];
  } else if (categoryType === "watches") {
    availableFinishes = ["GOLD MESH", "SILVER STEEL", "ROSE GOLD"];
  } else if (product.title.toLowerCase().includes("silver") || product.title.toLowerCase().includes("oxidised")) {
    availableFinishes = ["OXIDISED SILVER", "18K GOLD", "DUAL TONE"];
  }

  let availableSizes: string[] = [];
  if (categoryType === "bangles_kadas") {
    availableSizes = ["2.4", "2.6", "2.8", "Adjustable"];
  } else if (categoryType === "rings") {
    availableSizes = ["Free Size (Adjustable)"];
  } else if (categoryType === "necklaces") {
    availableSizes = ["Standard (40cm + 5cm Extender)"];
  } else if (categoryType === "watches") {
    availableSizes = ["Standard Fit (Adjustable)"];
  }

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
