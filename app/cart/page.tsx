import Cart from "@/components/products/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FakeStore tm - Cart",
  description: "A fake store for fake people from a fake api",
};

//TODO: make interface for searchParams
export default async function CartPage() {
  return (
    <main className="space-y-4 container mx-auto">
      <Cart />
    </main>
  );
}
