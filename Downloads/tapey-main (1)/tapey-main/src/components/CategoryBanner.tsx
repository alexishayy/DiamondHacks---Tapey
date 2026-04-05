import { ArrowRight } from "lucide-react";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

const CategoryBanner = ({ title, subtitle, image, reverse }: CategoryBannerProps) => {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} min-h-[400px]`}>
      <div className="md:w-1/2 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover min-h-[300px] hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-10 md:p-16 bg-secondary">
        <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-3 font-body">{subtitle}</p>
        <h2 className="font-display text-3xl md:text-4xl mb-4 italic">{title}</h2>
        <a href="#" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-foreground hover:text-primary transition-colors group">
          Discover More
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default CategoryBanner;
