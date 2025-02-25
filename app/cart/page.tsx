import Cart from "@/components/products/cart";

//TODO: make interface for searchParams
export default async function CartPage() {
  return (
    <main className="space-y-4 container mx-auto">
      <Cart />
    </main>
  );
}
