import { create } from "zustand";
import { products } from "@/data/products";

interface CartItem {
  productId: string;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartLines: () => { productId: string; name: string; price: number; qty: number; imageUrl: string; subtotal: number }[];
  subtotal: () => number;
  tax: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (productId, qty = 1) =>
    set((s) => {
      const existing = s.items.find((i) => i.productId === productId);
      if (existing) {
        return { items: s.items.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i)) };
      }
      return { items: [...s.items, { productId, qty }] };
    }),
  removeItem: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
  updateQty: (productId, qty) =>
    set((s) => ({
      items: qty <= 0 ? s.items.filter((i) => i.productId !== productId) : s.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    })),
  clearCart: () => set({ items: [] }),
  cartLines: () => {
    return get().items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        name: product?.name ?? "Unknown",
        price: product?.price ?? 0,
        qty: item.qty,
        imageUrl: product?.imageUrl ?? "",
        subtotal: (product?.price ?? 0) * item.qty,
      };
    });
  },
  subtotal: () => get().cartLines().reduce((sum, l) => sum + l.subtotal, 0),
  tax: () => get().subtotal() * 0.05,
  total: () => get().subtotal() + get().tax(),
  itemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
