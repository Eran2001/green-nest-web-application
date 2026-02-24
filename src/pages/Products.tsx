import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { FilterBar } from "@/components/FilterBar";
import { CategoryCard } from "@/components/CategoryCard";
import { useProductStore } from "@/stores/useProductStore";

const Products = () => {
  const { categories, filteredProducts } = useProductStore();
  const results = filteredProducts();

  return (
    <AppShell>
      <div className="container py-8 space-y-8">
        <h1 className="text-3xl font-bold">Our Plants</h1>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>

        <FilterBar />

        {results.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No plants match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default Products;
