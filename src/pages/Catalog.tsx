import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  categories,
  categoriesInFamily,
  familyLabels,
  familyBlurbs,
  familyPaths,
  filterProducts,
  getCategory,
  sortProducts,
  type Family,
  type SortKey,
} from "../data/catalog";
import ProductCard from "../components/ProductCard";
import PageBand from "../components/PageBand";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

export default function Catalog({ family }: { family?: Family }) {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? undefined;
  const sort = (params.get("sort") as SortKey) || "featured";
  const query = params.get("q") ?? "";

  // Categories to offer as filter chips.
  const chipCats = family ? categoriesInFamily(family) : categories;

  const results = useMemo(() => {
    let list = filterProducts({ family, category: activeCategory });
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        (p.name + " " + p.blurb).toLowerCase().includes(q)
      );
    }
    return sortProducts(list, sort);
  }, [family, activeCategory, sort, query]);

  const activeCat = activeCategory ? getCategory(activeCategory) : undefined;
  const title = activeCat ? activeCat.name : family ? familyLabels[family] : "Shop All";
  const blurb = activeCat
    ? activeCat.blurb
    : family
    ? familyBlurbs[family]
    : "Everything we make, in one place.";

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  const basePath = family ? familyPaths[family] : "/shop";

  return (
    <div>
      <PageBand
        eyebrow={family ? familyLabels[family] : "Shop"}
        title={title}
        blurb={blurb}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-14 pt-8">
      {/* breadcrumb */}
      <nav className="text-xs text-muted mb-4" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-flame">Home</Link>
        <span className="mx-1.5">/</span>
        <Link to={basePath} className="hover:text-flame">
          {family ? familyLabels[family] : "Shop"}
        </Link>
        {activeCat && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-inksoft">{activeCat.name}</span>
          </>
        )}
      </nav>

      {/* search */}
      <label className="block relative max-w-md">
        <span className="sr-only">Search products</span>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
             className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setParam("q", e.target.value || undefined)}
          placeholder="Search products"
          className="input !pl-10"
        />
      </label>

      {/* category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={!activeCategory} onClick={() => setParam("category", undefined)}>
          All
        </Chip>
        {chipCats.map((c) => (
          <Chip
            key={c.slug}
            active={activeCategory === c.slug}
            onClick={() => setParam("category", c.slug)}
          >
            {c.name}
          </Chip>
        ))}
      </div>

      {/* results header */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-4">
        <span className="text-sm text-muted tabular-nums">
          {results.length} {results.length === 1 ? "item" : "items"}
        </span>
        <label className="text-sm text-inksoft flex items-center gap-2">
          <span className="hidden sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "featured" ? undefined : e.target.value)}
            className="input py-1.5 pr-8"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* grid */}
      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {results.map((p) => (
            <ProductCard key={p.slug} p={p} showAddToCart />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-inksoft">
          {query ? (
            <>
              <p>No products match “{query}”.</p>
              <button type="button" onClick={() => setParam("q", undefined)} className="btn-outline mt-4">
                Clear search
              </button>
            </>
          ) : (
            <p>Nothing here yet — check back soon.</p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-sm px-4 py-2 rounded-full border transition-colors ${
        active
          ? "bg-flame text-paper border-transparent"
          : "bg-card text-inksoft border-line hover:border-flame hover:text-flame"
      }`}
    >
      {children}
    </button>
  );
}