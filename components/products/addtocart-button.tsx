"use client";

import { useCart } from "@/providers/cart-provider";
import { Button } from "../ui/button";
import { Product } from "@/lib/interfaces";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleClick = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };
  return (
    <Button
      className="hover:cursor-pointer"
      onClick={() => handleClick(product)}
    >
      Add to cart
    </Button>
  );
}
