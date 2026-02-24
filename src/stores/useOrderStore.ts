import { create } from "zustand";

export interface Order {
  id: string;
  date: string;
  items: { productId: string; name: string; price: number; qty: number; subtotal: number }[];
  subtotal: number;
  tax: number;
  total: number;
}

interface OrderStore {
  orders: Order[];
  createOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  createOrder: (order) => set((s) => ({ orders: [...s.orders, order] })),
  getOrderById: (id) => get().orders.find((o) => o.id === id),
}));
