import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryBanner from "@/components/CategoryBanner";
import NewsletterSection from "@/components/NewsletterSection";

import drunkElephantImg from "@/assets/drunk-elephant-logo.jpg";
import iliaImg from "@/assets/ilia.jpg";
import kosasImg from "@/assets/kosa.jpg";
import meritImg from "@/assets/merit-logo.jpg";

import makeupImg from "@/assets/clean-makeup.jpg";

const brands = [
  { image: drunkElephantImg, name: "Drunk Elephant", category: "Clean Skincare", price: "" },
  { image: iliaImg, name: "ILIA", category: "Clean Makeup", price: "" },
  { image: meritImg, name: "MERIT BEAUTY", category: "Clean Makeup", price: "",},
  { image: kosasImg, name: "KOSAS", category: "Clean Makeup", price: "" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body">Discover</p>
          <h2 className="font-display text-3xl md:text-4xl">
            <span className="italic">Top Clean Brands</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {brands.map((b) => (
            <ProductCard key={b.name} {...b} />
          ))}
        </div>
      </section>

      {/* About Us */}
      <section>
        <CategoryBanner
          title="Our Story"
          subtitle="About Us"
          image={makeupImg}
        />
      </section>

      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl mb-4">TAPEY</h3>
            <p className="text-muted-foreground text-sm font-body font-light leading-relaxed">
              Helping you find cleaner beauty.
            </p>
          </div>
          {[
            { title: "Pages", links: ["Home", "Start", "More Info"] },
            { title: "Company", links: ["About", "Contact", "Press"] },
            { title: "Help", links: ["FAQ", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-4 text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm font-body hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-xs font-body">© 2026 Tapey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
