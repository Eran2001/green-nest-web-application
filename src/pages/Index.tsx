import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ConsultationForm } from "@/components/ConsultationForm";
import { useProductStore } from "@/stores/useProductStore";
import { useCartStore } from "@/stores/useCartStore";
import { testimonials } from "@/data/testimonials";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight, Shield, Clock, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { categories, products } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const featuredProduct = products[0];

  const handleAddFeatured = () => {
    addItem(featuredProduct.id);
    toast({ title: "Added to cart", description: `${featuredProduct.name} added.` });
  };

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Smart Indoor<br />
              <span className="text-primary">Plants Market.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Transform your spaces with hand-picked, premium indoor plants. Delivered with care, styled with love.
            </p>
            <div className="flex gap-3">
              <Button size="lg" onClick={handleAddFeatured}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products">Learn More <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={featuredProduct.imageUrl}
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-muted-foreground">Featured</p>
              <p className="font-semibold text-sm">{featuredProduct.name}</p>
              <p className="text-primary font-bold">Rs. {featuredProduct.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: CreditCard, title: "Safe Payments", desc: "Secure transactions guaranteed" },
            { icon: Shield, title: "Shop with Confidence", desc: "100% quality assurance" },
            { icon: Clock, title: "24/7 Support", desc: "We're always here to help" },
          ].map((badge) => (
            <Card key={badge.title} className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Button variant="ghost" asChild>
            <Link to="/products">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-accent/30 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="container py-16">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Book a Free Plant Consultation</h2>
          <p className="text-muted-foreground">
            Our plant experts will help you choose the perfect greens for your space.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ConsultationForm />
        </div>
      </section>
    </AppShell>
  );
};

export default Index;
