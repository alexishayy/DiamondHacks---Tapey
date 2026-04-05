import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Search, Leaf, FlaskConical, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import productsData from "@/data/products.json";

interface ProductEntry {
  name: string;
  brand: string;
  ingredients: string;
  overall: number;
  scores: {
    ingredients: number;
    safety: number;
    sustainability: number;
    transparency: number;
  };
  flags: string[];
}

const products = productsData as ProductEntry[];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-500";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-green-100 text-green-800";
  if (score >= 60) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getBarColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const CATEGORY_KEYWORDS = [
  "lipstick",
  "mascara",
  "foundation",
  "concealer",
  "powder",
  "blush",
  "bronzer",
  "eyeshadow",
  "eyeliner",
  "liner",
  "primer",
  "moisturizer",
  "cream",
  "serum",
  "lotion",
  "cleanser",
  "toner",
  "mask",
  "oil",
  "spray",
  "gloss",
  "brow",
  "lashes",
  "perfume",
  "cologne",
  "scrub",
  "balm",
  "palette",
  "highlighter",
  "lip",
];

const getProductCategory = (name: string): string | null => {
  const lower = name.toLowerCase();
  return CATEGORY_KEYWORDS.find((kw) => lower.includes(kw)) || null;
};

const findAlternative = (product: ProductEntry): ProductEntry | null => {
  const category = getProductCategory(product.name);

  // First: find a better product in the SAME category
  if (category) {
    const sameCat = products
      .filter((p) => p.name !== product.name && p.overall > product.overall && getProductCategory(p.name) === category)
      .sort((a, b) => b.overall - a.overall);

    if (sameCat.length > 0) return sameCat[0];
  }

  // Fallback: any better product is not shown — we only suggest same-category
  return null;
};

const CategoryRow = ({
  name,
  score,
  icon,
  detail,
}: {
  name: string;
  score: number;
  icon: React.ReactNode;
  detail: string;
}) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-muted-foreground">{icon}</span>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-body">{name}</span>
        <span className={`font-display text-lg ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-700 ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground font-body font-light mt-1">{detail}</p>
    </div>
  </div>
);

const Start = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ProductEntry | null>(null);
  const [alternative, setAlternative] = useState<ProductEntry | null>(null);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductEntry[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);
    const q = query.toLowerCase().trim();
    const found = products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));

    if (found.length > 0) {
      const pick = found[0];
      setSelected(pick);
      setAlternative(findAlternative(pick));
      setSuggestions(found.slice(1, 4));
    } else {
      setSelected(null);
      setAlternative(null);
      setSuggestions([]);
    }
  };

  const selectProduct = (p: ProductEntry) => {
    setSelected(p);
    setAlternative(findAlternative(p));
    setSuggestions([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = (p: ProductEntry) => [
    {
      name: "Ingredients",
      score: p.scores.ingredients,
      icon: <FlaskConical className="w-4 h-4" />,
      detail: p.flags.length > 0 ? `Flagged: ${p.flags.slice(0, 3).join(", ")}` : "No major concerns found",
    },
    {
      name: "Environmentally Friendly",
      score: p.scores.sustainability,
      icon: <Leaf className="w-4 h-4" />,
      detail: p.scores.sustainability >= 70 ? "Eco-friendly signals found" : "Limited sustainability info",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body"></p>
            <h1 className="font-display text-3xl md:text-5xl mb-4">
              How <span className="italic">Clean</span> Is Your Beauty?
            </h1>
            <p className="text-muted-foreground font-body font-light max-w-lg mx-auto">
              Search from {products.length} Sephora products. We'll rate it and suggest a cleaner alternative.
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3 mb-12 max-w-2xl mx-auto">
            <Input
              placeholder="e.g. lipstick, NARS, moisturizer..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-none border-border font-body"
            />
            <Button
              onClick={handleSearch}
              className="rounded-none px-6 tracking-wider uppercase text-xs font-body gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>

          {/* No results */}
          {searched && !selected && (
            <div className="text-center py-16">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">No products found. Try a different name or brand.</p>
            </div>
          )}

          {/* Multiple matches */}
          {suggestions.length > 0 && (
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground mb-3">More matches</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectProduct(s)}
                    className="text-sm font-body border border-border px-3 py-1.5 hover:bg-secondary transition-colors"
                  >
                    {s.name} <span className="text-muted-foreground">— {s.brand}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Side-by-side results */}
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up">
              {/* Left: Your product rating */}
              <div className="border border-border p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground mb-1">Your Product</p>
                <p className="text-muted-foreground text-xs font-body mb-1">{selected.brand}</p>
                <h2 className="font-display text-xl md:text-2xl mb-4">{selected.name}</h2>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground">Overall</span>
                  <Badge className={`${getScoreBg(selected.overall)} text-lg px-4 py-1 rounded-none border-0`}>
                    {selected.overall}/100
                  </Badge>
                </div>
                <div className="space-y-1">
                  {categories(selected).map((cat) => (
                    <CategoryRow key={cat.name} {...cat} />
                  ))}
                </div>
                {selected.flags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground mb-2">
                      Flagged Ingredients
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.flags.map((f) => (
                        <Badge
                          key={f}
                          variant="outline"
                          className="rounded-none text-xs font-body text-red-600 border-red-200"
                        >
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Cleaner alternative */}
              <div className="border border-green-200 bg-green-50/30 p-6 md:p-8">
                {alternative ? (
                  <>
                    <p className="text-xs tracking-[0.2em] uppercase font-body text-green-700 mb-1 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3" />
                      Cleaner Alternative
                    </p>
                    <p className="text-muted-foreground text-xs font-body mb-1">{alternative.brand}</p>
                    <h2 className="font-display text-xl md:text-2xl mb-4">{alternative.name}</h2>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground">
                        Overall
                      </span>
                      <Badge className={`${getScoreBg(alternative.overall)} text-lg px-4 py-1 rounded-none border-0`}>
                        {alternative.overall}/100
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {categories(alternative).map((cat) => (
                        <CategoryRow key={cat.name} {...cat} />
                      ))}
                    </div>
                    {alternative.overall > selected.overall && (
                      <div className="mt-4 pt-4 border-t border-green-200"></div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                      <p className="font-display text-xl mb-2">Great Choice!</p>
                      <p className="text-sm text-muted-foreground font-body">
                        This is already one of the cleanest options in our database.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
