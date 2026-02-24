import { Card, CardContent } from "@/components/ui/card";
import { useProductStore } from "@/stores/useProductStore";
import { useNavigate } from "react-router-dom";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  const setCategory = useProductStore((s) => s.setCategory);
  const navigate = useNavigate();

  const handleClick = () => {
    setCategory(category.id);
    navigate("/products");
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-semibold text-sm">{category.name}</p>
        </div>
      </div>
    </Card>
  );
}
