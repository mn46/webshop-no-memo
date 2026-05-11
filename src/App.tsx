import { useEffect, useState } from "react";
import { type Category, type CartProduct, type Product } from "./types";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=200");

      if (!res.ok) {
        setLoading(false);
        setError("Error while fetching the products.");
        throw new Error("Error when fetching the data.");
      }

      const data = await res.json();

      if (data) {
        setProducts(data.products);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");

      if (!res.ok) {
        setError("Error while fetching the categories.");
        throw new Error("Error when fetching the categories.");
      }

      const data = await res.json();

      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter(
        (product) => product.category === activeCategory.toLowerCase(),
      )
    : products;

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleSetActiveCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  return error ? (
    <p>{error}</p>
  ) : (
    <div className="m-10">
      {categories.length > 0 && (
        <div>
          <p className="text-xl font-semibold">Filter by category</p>
          <div className="flex flex-row flex-wrap gap-5 mt-5">
            <button
              onClick={() => handleSetActiveCategory(null)}
              className={`rounded-full px-4 ${activeCategory === null ? "bg-black text-white" : "bg-gray-300"} `}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleSetActiveCategory(category.name)}
                className={`rounded-full px-4 ${activeCategory === category.name ? "bg-black text-white" : "bg-gray-300"} `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-8 mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
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
