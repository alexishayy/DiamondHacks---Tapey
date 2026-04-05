import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Search, Leaf, FlaskConical, ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
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

const Start = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductEntry[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);
    const q = query.toLowerCase().trim();
    const found = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    ).slice(0, 10);
    setResults(found);
  };

  const categories = (p: ProductEntry) => [
    { name: "Ingredients", score: p.scores.ingredients, icon: <FlaskConical className="w-4 h-4" />, detail: p.flags.length > 0 ? `Flagged: ${p.flags.slice(0, 4).join(", ")}` : "No major concerns found" },
    { name: "Safety", score: p.scores.safety, icon: <ShieldCheck className="w-4 h-4" />, detail: p.scores.safety >= 80 ? "Tested & approved by professionals" : "Standard safety profile" },
    { name: "Sustainability", score: p.scores.sustainability, icon: <Leaf className="w-4 h-4" />, detail: p.scores.sustainability >= 70 ? "Positive eco-friendly signals" : "Limited sustainability info" },
    { name: "Transparency", score: p.scores.transparency, icon: <CheckCircle className="w-4 h-4" />, detail: p.scores.transparency >= 80 ? "Full ingredient disclosure" : "Partial ingredient info" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body">Product Scanner</p>
            <h1 className="font-display text-3xl md:text-5xl mb-4">
              How <span className="italic">Clean</span> Is It?
            </h1>
            <p className="text-muted-foreground font-body font-light max-w-lg mx-auto">
              Search from {products.length} real products. We'll rate how clean they are across ingredients, sustainability, safety, and transparency.
            </p>
          </div>

          <div className="flex gap-3 mb-12">
            <Input
              placeholder="e.g. lipstick, NARS, moisturizer..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-none border-border font-body"
            />
            <Button onClick={handleSearch} className="rounded-none px-6 tracking-wider uppercase text-xs font-body gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>

          {searched && results.length === 0 && (
            <div className="text-center py-16">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">No products found. Try a different name or brand.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-10 animate-fade-up">
              {results.map((product, idx) => (
                <div key={idx} className="border border-border p-6 md:p-8">
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-body mb-1">{product.brand}</p>
                    <h2 className="font-display text-xl md:text-2xl mb-3">{product.name}</h2>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground">Overall Score</span>
                      <Badge className={`${getScoreBg(product.overall)} text-lg px-4 py-1 rounded-none border-0`}>
                        {product.overall}/100
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories(product).map((cat) => (
                      <Card key={cat.name} className="rounded-none border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center justify-between text-base font-body">
                            <span className="flex items-center gap-2">
                              {cat.icon}
                              {cat.name}
                            </span>
                            <span className={`font-display text-2xl ${getScoreColor(cat.score)}`}>{cat.score}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-700 ${getBarColor(cat.score)}`}
                              style={{ width: `${cat.score}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground font-body font-light">{cat.detail}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
