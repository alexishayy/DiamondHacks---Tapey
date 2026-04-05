import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: string;
  badge?: string;
}

const ProductCard = ({ image, name, category, price }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-secondary mb-4 aspect-square">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? "fill-accent text-accent" : "text-foreground"}`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
      </div>
      <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase mb-1 font-body">{category}</p>
      <h3 className="font-display text-lg mb-1">{name}</h3>
      <p className="text-foreground font-body font-medium">{price}</p>
    </div>
  );
};

export default ProductCard;
