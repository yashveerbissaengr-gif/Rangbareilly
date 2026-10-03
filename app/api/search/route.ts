import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  if (query.length > 100) {
    return NextResponse.json({ error: "Search query is too long" }, { status: 400 });
  }

  const products = await getProducts(query);

  return NextResponse.json({
    products: products.slice(0, 6).map((product) => ({
      slug: product.slug,
      title: product.title,
      price: product.price,
    })),
  });
}