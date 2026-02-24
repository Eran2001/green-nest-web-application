import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartLines, subtotal, tax, total, updateQty, removeItem, clearCart, items } = useCartStore();
  const createOrder = useOrderStore((s) => s.createOrder);
  const navigate = useNavigate();
  const lines = cartLines();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast({ title: "Cart is empty", description: "Add some plants first!", variant: "destructive" });
      return;
    }
    const orderId = `GN-${Date.now()}`;
    createOrder({
      id: orderId,
      date: new Date().toISOString(),
      items: lines.map((l) => ({ productId: l.productId, name: l.name, price: l.price, qty: l.qty, subtotal: l.subtotal })),
      subtotal: subtotal(),
      tax: tax(),
      total: total(),
    });
    clearCart();
    navigate(`/order-success/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <AppShell>
        <div className="container py-16 text-center space-y-4">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Start adding some beautiful plants!</p>
          <Button asChild><Link to="/products">Browse Products</Link></Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {lines.map((line) => (
              <Card key={line.productId} className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <img src={line.imageUrl} alt={line.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{line.name}</h3>
                    <p className="text-sm text-muted-foreground">Rs. {line.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center border rounded-lg shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(line.productId, line.qty - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(line.productId, line.qty + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-semibold text-sm w-24 text-right shrink-0">Rs. {line.subtotal.toLocaleString()}</p>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={() => removeItem(line.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="border-0 shadow-md h-fit">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-bold text-lg">Order Summary</h2>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>Rs. {subtotal().toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sales Tax (5%)</span><span>Rs. {tax().toLocaleString()}</span></div>
                <Separator />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">Rs. {total().toLocaleString()}</span></div>
              </div>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default Cart;
