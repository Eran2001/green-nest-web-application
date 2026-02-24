import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Phone, Menu, Moon, Sun, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { useTheme } from "next-themes";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/plant-decoration", label: "Plant Decoration" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.itemCount);
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Leaf className="h-6 w-6" />
          <span>GreenNest</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-accent ${
                location.pathname === link.to ? "text-primary bg-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link to="/products"><Search className="h-4 w-4" /></Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <a href="tel:+94771234567"><Phone className="h-4 w-4" /></a>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {itemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {itemCount()}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <Leaf className="h-5 w-5" /> GreenNest
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileNavOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
                      location.pathname === link.to ? "bg-accent text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
