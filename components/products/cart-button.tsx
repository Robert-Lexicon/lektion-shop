"use client";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { useCart } from "@/providers/cart-provider";
import Link from "next/link";

export default function CartButton() {
  const { cartCount } = useCart();
  return (
    <Link
      href={"/cart"}
      className={`${buttonVariants({ variant: "outline" })} relative`}
    >
      <span className="sr-only">Cart Items</span>
      <ShoppingCart className="size-7" />
      {cartCount > 0 && (
        <div className="absolute inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-1 -end-1 dark:border-gray-900">
          {cartCount}
        </div>
      )}
    </Link>
  );
}
