import { Link } from "react-router-dom";
import { Leaf, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLeadStore } from "@/stores/useLeadStore";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const addSubscription = useLeadStore((s) => s.addSubscription);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSubscription(email);
    toast({ title: "Subscribed!", description: "Welcome to the GreenNest family." });
    setEmail("");
  };

  return (
    <footer className="border-t bg-card">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Leaf className="h-5 w-5" /> GreenNest
          </Link>
          <p className="text-sm text-muted-foreground">
            Premium indoor plants for modern living. Transform your space with nature.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Quick Links</h4>
          {["/", "/about", "/products", "/contact"].map((to) => (
            <Link key={to} to={to} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
              {to === "/" ? "Home" : to.slice(1).charAt(0).toUpperCase() + to.slice(2)}
            </Link>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Contact</h4>
          <p className="text-sm text-muted-foreground">123 Botanical Lane, Colombo 07</p>
          <p className="text-sm text-muted-foreground">+94 77 123 4567</p>
          <p className="text-sm text-muted-foreground">hello@greennest.lk</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Newsletter</h4>
          <p className="text-sm text-muted-foreground">Get plant care tips & exclusive offers.</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <Input
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9"
            />
            <Button size="sm" type="submit">
              <Mail className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t py-4">
        <p className="text-center text-xs text-muted-foreground">© 2026 GreenNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
