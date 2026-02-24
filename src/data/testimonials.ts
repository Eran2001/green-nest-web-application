export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sachini Fernando",
    role: "Interior Designer",
    quote: "GreenNest transformed my clients' spaces. The quality of plants and the styling advice are unmatched. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "2",
    name: "Amal Jayawardena",
    role: "Tech Startup Founder",
    quote: "Our office went from dull to delightful. The low-maintenance office plants collection is perfect for busy professionals.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "3",
    name: "Dilani Perera",
    role: "Home & Living Blogger",
    quote: "The plant decoration service helped me find exactly the right plants for every room. My followers love the results!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
];
