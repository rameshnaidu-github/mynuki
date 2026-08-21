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

  // Categories to offer as filter chips.
  const chipCats = family ? categoriesInFamily(family) : categories;

  const results = useMemo(() => {
    const list = filterProducts({ family, category: activeCategory });
    return sortProducts(list, sort);
  }, [family, activeCategory, sort]);

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
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
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

      <header>
        <span className="eyebrow">{family ? familyLabels[family] : "Shop"}</span>
        <h1 className="text-4xl md:text-5xl mt-2">{title}</h1>
        <p className="mt-3 text-inksoft font-light max-w-2xl">{blurb}</p>
      </header>

      {/* category chips */}
      <div className="mt-8 flex flex-wrap gap-2">
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
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-inksoft">Nothing here yet — check back soon.</p>
      )}
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
