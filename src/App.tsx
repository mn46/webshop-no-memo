import { useEffect, useState } from "react";
import type { CartProduct, Product } from "./types";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartModal from "./components/CartModal";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return error ? (
    <p>{error}</p>
  ) : (
    <div>
      <div className="grid grid-cols-5 gap-8 m-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))
        )}
      </div>
      <button
        className="fixed bottom-5 right-5 bg-black text-white rounded-full px-5 py-2 cursor-pointer"
        onClick={handleOpenCart}
      >
        cart
      </button>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          cart={cart}
          setCart={setCart}
        />
      )}
      {isCartOpen && (
        <CartModal
          cart={cart}
          setCart={setCart}
          setIsCartOpen={setIsCartOpen}
        />
      )}
    </div>
  );
}

export default App;
