import cleanImg from "@/assets/clean-beauty.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <img
        src={cleanImg}
        alt="Clean beauty products"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[0.95] mb-6 animate-fade-up [animation-delay:200ms] opacity-0">
          Find Makeup
          <br />
          <span className="italic font-normal">Better For You & The World</span>
      
        </h1>
        <p className="text-primary-foreground/80 font-body font-light text-lg md:text-xl max-w-md mb-8 animate-fade-up [animation-delay:400ms] opacity-0">
          Tapey helps you discover clean beauty alternatives to your everyday makeup staples. 
        </p>
        <div className="flex gap-4 animate-fade-up [animation-delay:600ms] opacity-0">
          <Button
            style={{backgroundColor: '#3a5a40', borderColor: '#3a5a40'}}
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-none px-8 tracking-wider uppercase text-xs font-body"
          >
            <Link to="/start">
              <Sparkles className="w-4 h-4" />
              Rate a Product
            </Link>
          </Button>
          <Button
            style={{backgroundColor: '#3a5a40', borderColor: '#3a5a40'}}
            asChild
            variant="outline"
            size="lg"
            className="border-rose-400 text-white bg-rose-500 hover:bg-rose-600 gap-2 rounded-none px-8 tracking-wider uppercase text-xs font-body"          >
            <Link to="/more-info">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
