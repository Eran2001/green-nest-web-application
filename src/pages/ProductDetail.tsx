import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShoppingCart, Minus, Plus, ArrowLeft, Star } from "lucide-react";
import { useProductStore } from "@/stores/useProductStore";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = useProductStore((s) => s.getProductById)(id!);
  const products = useProductStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <AppShell>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Button asChild className="mt-4"><Link to="/products">Back to Products</Link></Button>
        </div>
      </AppShell>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    toast({ title: "Added to cart", description: `${qty}× ${product.name} added.` });
  };

  return (
    <AppShell>
      <div className="container py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/products"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
              <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            </div>

            <p className="text-2xl font-bold text-primary">Rs. {product.price.toLocaleString()}</p>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
              {product.petFriendly && <Badge variant="outline">🐾 Pet Friendly</Badge>}
              <Badge variant="outline">💡 {product.light} light</Badge>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" onClick={handleAdd} className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="care">
                <AccordionTrigger>Care Tips</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                    {product.careTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
};

export default ProductDetail;
