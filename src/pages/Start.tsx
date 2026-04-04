import { useState } from "react";
import { Search, Leaf, FlaskConical, ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RatingCategory {
  name: string;
  score: number;
  icon: React.ReactNode;
  detail: string;
}

interface ProductResult {
  name: string;
  brand: string;
  overallScore: number;
  categories: RatingCategory[];
}

const mockResults: Record<string, ProductResult> = {
  "cerave moisturizer": {
    name: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    overallScore: 82,
    categories: [
      { name: "Ingredients", score: 85, icon: <FlaskConical className="w-4 h-4" />, detail: "Mostly clean, minimal synthetic additives" },
      { name: "Sustainability", score: 70, icon: <Leaf className="w-4 h-4" />, detail: "Standard packaging, not fully recyclable" },
      { name: "Safety", score: 90, icon: <ShieldCheck className="w-4 h-4" />, detail: "Dermatologist-tested, hypoallergenic" },
      { name: "Transparency", score: 80, icon: <CheckCircle className="w-4 h-4" />, detail: "Full ingredient list disclosed" },
    ],
  },
  "maybelline mascara": {
    name: "Maybelline Lash Sensational",
    brand: "Maybelline",
    overallScore: 58,
    categories: [
      { name: "Ingredients", score: 50, icon: <FlaskConical className="w-4 h-4" />, detail: "Contains parabens and synthetic dyes" },
      { name: "Sustainability", score: 45, icon: <Leaf className="w-4 h-4" />, detail: "Non-recyclable packaging" },
      { name: "Safety", score: 75, icon: <ShieldCheck className="w-4 h-4" />, detail: "Ophthalmologist tested" },
      { name: "Transparency", score: 60, icon: <CheckCircle className="w-4 h-4" />, detail: "Partial ingredient sourcing info" },
    ],
  },
};

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

const Start = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProductResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(true);
    const key = query.toLowerCase().trim();
    const found = Object.entries(mockResults).find(([k]) => key.includes(k) || k.includes(key));
    setResult(found ? found[1] : null);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body">Product Scanner</p>
          <h1 className="font-display text-3xl md:text-5xl mb-4">
            How <span className="italic">Clean</span> Is It?
          </h1>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto">
            Type a product name below and we'll rate how clean it is across ingredients, sustainability, safety, and transparency.
          </p>
        </div>

        <div className="flex gap-3 mb-12">
          <Input
            placeholder="e.g. CeraVe Moisturizer, Maybelline Mascara..."
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

        {searched && !result && (
          <div className="text-center py-16">
            <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">No results found. Try searching for "CeraVe Moisturizer" or "Maybelline Mascara".</p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-fade-up">
            <div className="text-center mb-8">
              <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-body mb-1">{result.brand}</p>
              <h2 className="font-display text-2xl md:text-3xl mb-3">{result.name}</h2>
              <div className="inline-flex items-center gap-2">
                <span className="text-xs tracking-[0.2em] uppercase font-body text-muted-foreground">Overall Score</span>
                <Badge className={`${getScoreBg(result.overallScore)} text-lg px-4 py-1 rounded-none border-0`}>
                  {result.overallScore}/100
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.categories.map((cat) => (
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
                        className={`h-2 rounded-full transition-all duration-700 ${
                          cat.score >= 80 ? "bg-green-500" : cat.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground font-body font-light">{cat.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;
