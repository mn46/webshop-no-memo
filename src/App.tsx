import { useEffect, useState } from "react";
import type { Product } from "./types";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=100",
      );

      if (!res.ok) {
        setLoading(false);
        setError("Error while fetching the products.");
        throw new Error("Error when fetching the data.");
      }

      const data = await res.json();

      if (data) {
        setProducts(data);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-5 gap-y-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
