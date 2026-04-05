import { ExternalLink, BookOpen, Leaf, FlaskConical, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import React from "react";

const resources = [
  {
    title: "Prioritizing Consumer Health",
    description:
      "Clean beauty puts the health of its consumers at the front lines. Clean beauty removes potentially toxic ingredients, such as parabens, synthetic frgrances, and phthalates. Further preventing any long-term health issues. ",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: "Promoting Sustainability",
    description:
      "Conventional makeup oftentimes harms sustainability through excessive waste, water pollution, and chemical contamination. Standard makeup is likely packaged in non-biodegradable plastics and made of silicones that damages marine life and contributes to tons of waste. Many beauty products are also made of palm oil, further driving deforestation and the production of CO2 emissions. Clean beauty can be used to combat past damages from standard beauty, where sustainable packaging and ingredients will not harm our Earth.",
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    title: "Cruelty Free",
    description:
      "Cruelty-free makeup ensures that no beauty products are tested on animals. Millions of animals are killed annualy due to animal testing. Choosing cruelty-free products improves not only animal population but also our environent by reducing pollution, conserving resources, and lowering carbon emissions assoicated with lab testing.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Sephora Brands That Aren't Cruelty Free",
    description:
      "MAC Cosmetics, SEPHORA COLLECTION, Caudalie, Lancôme, NARS, Dior, Givenchy, Benefit Cosmetics, Bobbi Brown, Burberry, BVLGARI, L’Occitane, Laura Mercier, Fresh, Shiseido philosophy, Yves Saint Laurent (YSL), TOM FORD, MAKE UP FOR EVER, Calvin Klein, Clinique, Gucci, Guerlain, and Marc Jacobs Fragrances.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Ingredients To Look Out For",
    description:
      "If you see any of these ingredients in your products- oxybenzone, triclosan, phthalates, PEGs, and silicones- consider choosing an environmentally friendly alternative.",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const MoreInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-14">
            <h1 className="font-display text-3xl md:text-5xl mb-4">Why Clean Beauty?</h1>
            <p className="text-muted-foreground font-body font-light max-w-lg mx-auto">
              Why is clean beauty so important not only for us, but also for our environment?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r) => (
              <a key={r.title} target="_blank" rel="noopener noreferrer" className="group">
                <Card className="rounded-none border-border h-full hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base font-body">
                      <span className="flex items-center gap-2">
                        {r.icon}
                        {r.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body"></span>
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
    </div>
  );
};

export default MoreInfo;
