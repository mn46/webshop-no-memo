import React, { type SetStateAction } from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
  setSelectedProduct: React.Dispatch<SetStateAction<Product | null>>;
}

const ProductCard: React.FC<Props> = ({ product, setSelectedProduct }) => {
  const handleSetSelectedProduct = () => {
    setSelectedProduct(product);
  };

  return (
    <button onClick={handleSetSelectedProduct} className="cursor-pointer">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-auto rounded-xl"
      />
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p>{product.price} DKK</p>
    </button>
  );
};

export default ProductCard;
