"use client";

import { Product } from "@/lib/interfaces";
import { createContext, useContext, useState } from "react";

type CartItem = {
  product: Product;
  quantity: number;
};

//here we state what is available in our context
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  cartTotal: number;
  cartCount: number;
};

//create the context with undefined as initial state (since it is empty from start)
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

//the main CartProvider method
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //we use state to handle updates of the cart
  const [cart, setCart] = useState<CartItem[]>([]);

  //method to be used when we add a product to the cart
  function addToCart(product: Product) {
    setCart((prevCart) => {
      //first check if we have an existing item with that id already
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      //if it exist up the quantity by 1
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //else keep the previous cart and add the new item to it
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  }

  //make the total amount of items in the cart available
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  //make the total price of the items in the cart available
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  //return our context to be used
  return (
    <CartContext.Provider value={{ cart, addToCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

//make our custom hook to use the cart
export const useCart = () => {
  const context = useContext(CartContext);
  //this is to see that we don't try to use the hook without having the right context for it
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
