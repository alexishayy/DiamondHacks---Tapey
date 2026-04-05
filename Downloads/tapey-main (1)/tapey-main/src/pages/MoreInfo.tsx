import { ExternalLink, BookOpen, Leaf, FlaskConical, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    title: "EWG Skin Deep Database",
    description: "Search over 90,000 products and ingredients rated for safety by the Environmental Working Group.",
    url: "https://www.ewg.org/skindeep/",
    icon: <ShieldCheck className="w-5 h-5" />,
    category: "Safety",
  },
  {
    title: "Think Dirty App",
    description: "Scan product barcodes to learn about potentially toxic ingredients in your cosmetics.",
    url: "https://www.thinkdirtyapp.com/",
    icon: <FlaskConical className="w-5 h-5" />,
    category: "Ingredients",
  },
  {
    title: "Good Face Project",
    description: "Science-backed beauty ingredient analysis and clean beauty certification.",
    url: "https://thegoodfaceproject.com/",
    icon: <BookOpen className="w-5 h-5" />,
    category: "Research",
  },
  {
    title: "Sustainable Packaging Coalition",
    description: "Resources on sustainable packaging solutions and recyclability guidelines.",
    url: "https://sustainablepackaging.org/",
    icon: <Leaf className="w-5 h-5" />,
    category: "Sustainability",
  },
  {
    title: "Campaign for Safe Cosmetics",
    description: "Advocacy for eliminating dangerous chemicals from cosmetics and personal care products.",
    url: "https://www.safecosmetics.org/",
    icon: <ShieldCheck className="w-5 h-5" />,
    category: "Safety",
  },
  {
    title: "INCI Decoder",
    description: "Decode the ingredient lists on your beauty products and understand what each ingredient does.",
    url: "https://incidecoder.com/",
    icon: <FlaskConical className="w-5 h-5" />,
    category: "Ingredients",
  },
];

const MoreInfo = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-14">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body">Learn More</p>
          <h1 className="font-display text-3xl md:text-5xl mb-4">
            Clean Beauty <span className="italic">Resources</span>
          </h1>
          <p className="text-muted-foreground font-body font-light max-w-lg mx-auto">
            Educate yourself on what goes into your beauty products. Here are trusted resources to help you make informed choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((r) => (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="rounded-none border-border h-full hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base font-body">
                    <span className="flex items-center gap-2">
                      {r.icon}
                      {r.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">{r.category}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-body font-light">{r.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
