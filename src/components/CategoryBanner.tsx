import { ArrowRight } from "lucide-react";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  reverse?: boolean;
}

const CategoryBanner = ({ title, subtitle, image, reverse, description }: CategoryBannerProps) => {
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
                {description && ( // add this
          <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
            {description}
          </p>
        )}
      </div>
    </div>


  );
};


export default CategoryBanner;
