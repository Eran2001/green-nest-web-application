import { create } from "zustand";
import { products, Product } from "@/data/products";
import { categories, Category } from "@/data/categories";

interface Filters {
  category: string;
  search: string;
  priceRange: [number, number];
  sort: string;
}

interface ProductStore {
  products: Product[];
  categories: Category[];
  filters: Filters;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: string) => void;
  resetFilters: () => void;
  filteredProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
}

const defaultFilters: Filters = {
  category: "all",
  search: "",
  priceRange: [0, 10000],
  sort: "popularity",
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products,
  categories,
  filters: { ...defaultFilters },
  setCategory: (category) => set((s) => ({ filters: { ...s.filters, category } })),
  setSearch: (search) => set((s) => ({ filters: { ...s.filters, search } })),
  setPriceRange: (priceRange) => set((s) => ({ filters: { ...s.filters, priceRange } })),
  setSort: (sort) => set((s) => ({ filters: { ...s.filters, sort } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  filteredProducts: () => {
    const { products, filters } = get();
    let filtered = [...products];

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.reverse();
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return filtered;
  },
  getProductById: (id) => get().products.find((p) => p.id === id),
}));
