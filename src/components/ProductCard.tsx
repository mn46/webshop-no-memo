import React from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-56 h-auto"
      />
      <h2>{product.title}</h2>
      <p>{product.price} DKK</p>
      <button>Read more</button>
    </div>
  );
};

export default ProductCard;
