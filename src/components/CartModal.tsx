import React, { type SetStateAction } from "react";
import type { CartProduct } from "../types";

interface Props {
  cart: CartProduct[];
  setCart: React.Dispatch<SetStateAction<CartProduct[]>>;
  setIsCartOpen: React.Dispatch<SetStateAction<boolean>>;
}

const CartModal: React.FC<Props> = ({ cart, setIsCartOpen, setCart }) => {
  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleRemoveFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <div className="fixed bg-black/40 w-screen h-screen z-1 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-5 w-[90vw] h-[90vh] rounded-xl flex flex-col gap-2 overflow-auto">
        <button
          onClick={handleClose}
          className="text-2xl font-bold cursor-pointer p-4 self-end"
        >
          X
        </button>
        <div className="grid grid-cols-4 gap-8">
          {cart.map((product) => (
            <div className="max-w-60 grid grid-flow-row gap-2">
              <img
                src={product.images[0]}
                alt={product.title}
                className="rounded-xl"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <div className="flex flex-row justify-between">
                <p>x {product.amount}</p>
                <p>{product.amount * product.price} DKK</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="bg-black text-white rounded-full h-8 cursor-pointer"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
