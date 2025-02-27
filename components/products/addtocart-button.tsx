"use client";

import { useCart } from "@/providers/cart-provider";
import { Button } from "../ui/button";
import { Product } from "@/lib/interfaces";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

//uses children to render the content of the button we want
//and classname props is merged with the current classname by use of clsx/cn
export default function AddToCartButton({
  product,
  children,
  className,
}: {
  product: Product;
  children: React.ReactNode;
  className?: string;
}) {
  const { addToCart } = useCart();

  const handleClick = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Button
      className={cn("hover:cursor-pointer", className)}
      onClick={() => handleClick(product)}
    >
      {children}
    </Button>
  );
}
