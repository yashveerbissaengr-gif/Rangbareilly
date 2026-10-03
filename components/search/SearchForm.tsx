"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchSuggestion {
  slug: string;
  title: string;
  price: number;
}

interface SearchFormProps {
  initialQuery: string;
}

export function SearchForm({ initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestionResult, setSuggestionResult] = useState<{
    query: string;
    products: SearchSuggestion[];
  } | null>(null);
  const normalizedQuery = query.trim();
  const showSuggestions = normalizedQuery.length >= 2;
  const resultMatchesQuery = suggestionResult?.query === normalizedQuery;
  const suggestions = resultMatchesQuery ? suggestionResult.products : [];
  const isLoading = showSuggestions && !resultMatchesQuery;

  useEffect(() => {
    if (!showSuggestions) return;

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(normalizedQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search suggestions unavailable");

        const result: { products: SearchSuggestion[] } = await response.json();
        setSuggestionResult({ query: normalizedQuery, products: result.products });
      } catch {
        if (!controller.signal.aborted) {
          setSuggestionResult({ query: normalizedQuery, products: [] });
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [normalizedQuery, showSuggestions]);

  return (
    <div className="relative mx-auto mb-12 max-w-2xl">
      <form action="/search" method="get" className="flex gap-2">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          name="q"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="product-search-suggestions"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search jewelry..."
          className="min-w-0 flex-1 rounded-md border border-[#D8C9CB] bg-white px-4 py-3 text-[#1F1215] outline-none focus:border-[#E63956] focus:ring-2 focus:ring-[#E63956]/20"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#E63956] text-white transition hover:bg-[#C42D47] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63956]"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {showSuggestions && (
        <ul
          id="product-search-suggestions"
          role="listbox"
          aria-label="Product suggestions"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-md border border-[#E8DADD] bg-white shadow-lg"
        >
          {isLoading ? (
            <li className="px-4 py-3 text-sm text-[#7D6B6E]" role="status">
              Searching products...
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <li key={product.slug} role="option" aria-selected="false">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-[#1F1215] transition hover:bg-[#FFF3F4] focus-visible:bg-[#FFF3F4] focus-visible:outline-none"
                >
                  <span className="truncate">{product.title}</span>
                  <span className="shrink-0 font-semibold text-[#7D6B6E]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-[#7D6B6E]" role="status">
              No matching products
            </li>
          )}
        </ul>
      )}
    </div>
  );
}