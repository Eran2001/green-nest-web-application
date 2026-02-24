import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id);
    toast({ title: "Added to cart", description: `${product.name} added.` });
  };

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      className="cursor-pointer group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.tags[0] && (
          <Badge className="absolute top-3 left-3 text-[10px]">{product.tags[0]}</Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
        <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
        </div>
        <Button size="sm" className="w-full mt-2" onClick={handleAdd}>
          <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
