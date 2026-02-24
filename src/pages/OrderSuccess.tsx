import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { useOrderStore } from "@/stores/useOrderStore";

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useOrderStore((s) => s.getOrderById)(orderId!);

  if (!order) {
    return (
      <AppShell>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Order not found.</p>
          <Button asChild className="mt-4"><Link to="/products">Continue Shopping</Link></Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container py-16 max-w-lg mx-auto text-center space-y-6">
        <CheckCircle className="h-20 w-20 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Order Placed!</h1>
        <p className="text-muted-foreground">Thank you for your purchase.</p>

        <Card className="border-0 shadow-md text-left">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <Separator />
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.name} × {item.qty}</span>
                <span>Rs. {item.subtotal.toLocaleString()}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span>Rs. {order.tax.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span className="text-primary">Rs. {order.total.toLocaleString()}</span></div>
          </CardContent>
        </Card>

        <Button size="lg" asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    </AppShell>
  );
};

export default OrderSuccess;
