"use client";

import { useCart } from "@/providers/cart-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, cartTotal, cartCount } = useCart();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead></TableHead>
              <TableHead className="max-w-[100px]">Price</TableHead>
              <TableHead className="max-w-[100px]">Qty</TableHead>
              <TableHead className="w-[100px] text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell className="w-[60px]">
                  <Image
                    src={item.product.image}
                    height={40}
                    width={40}
                    alt=""
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/product/${item.product.id}`}>
                    {item.product.title}
                  </Link>
                </TableCell>
                <TableCell>${item.product.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.quantity * item.product.price}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-bold text-right">Total:</TableCell>

              <TableCell>{cartCount}</TableCell>
              <TableCell className="text-right">
                ${cartTotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
