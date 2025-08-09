import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import * as React from "react";

export interface Product {
  id: string;
  name: string;
  price: number; // cents
  image: string;
  rating: number; // 0..5
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const dollars = (product.price / 100).toFixed(2);
  return (
    <Card className="group overflow-hidden transition-[transform,box-shadow] will-change-transform hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={`${product.name} product photo`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{product.name}</CardTitle>
          <span className="shrink-0 font-semibold">${dollars}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }
            />
          ))}
          <span className="ml-1">{product.rating.toFixed(1)}</span>
        </div>
        <Button className="mt-4 w-full" variant="secondary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
