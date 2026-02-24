export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "house-plants",
    name: "House Plants",
    icon: "🌿",
    description: "Beautiful plants for your living spaces",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
  },
  {
    id: "office-plants",
    name: "Office Plants",
    icon: "🪴",
    description: "Low-maintenance greens for your workspace",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
  },
  {
    id: "bonsais",
    name: "Bonsais",
    icon: "🌳",
    description: "Miniature trees, timeless art",
    image: "https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&h=300&fit=crop",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "🏺",
    description: "Pots, tools & care essentials",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  },
];
