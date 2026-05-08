import React, { useState, type SetStateAction } from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
  setSelectedProduct: React.Dispatch<SetStateAction<Product | null>>;
}

const ProductModal: React.FC<Props> = ({ product, setSelectedProduct }) => {
  const [amount, setAmount] = useState<number>(1);

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const incrementAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decrementAmount = () => {
    if (amount > 1) setAmount((prev) => prev - 1);
  };

  return (
    <div className="fixed bg-black/40 w-screen h-screen z-1 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-5 w-[90vw] h-[90vh] rounded-xl flex flex-col gap-2">
        <button
          onClick={handleClose}
          className="text-2xl font-bold cursor-pointer p-4 self-end"
        >
          X
        </button>
        <div className="grid grid-cols-2 mx-10 min-h-0 gap-10">
          <img
            src={product.images[0]}
            alt={product.title}
            className="rounded-xl"
          />
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <div className="flex flex-row justify-between">
              <p className="text-xl font-semibold">{product.price} DKK</p>
              <div className="flex flex-row gap-5 items-center">
                <button
                  onClick={decrementAmount}
                  className="bg-black rounded-full w-8 aspect-square text-center text-white font-bold text-xl"
                >
                  -
                </button>
                <p>{amount}</p>
                <button
                  onClick={incrementAmount}
                  className="bg-black rounded-full w-8 aspect-square text-center text-white font-bold text-xl"
                >
                  +
                </button>
                <button className="bg-black rounded-full text-white px-5 py-1">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
