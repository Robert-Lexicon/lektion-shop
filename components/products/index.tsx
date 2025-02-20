import { Product } from "@/lib/interfaces";
import Link from "next/link";
import { ProductListCard } from "./product-list-card";

export async function Products({ products }: { products: Promise<Product[]> }) {
  const allProducts = await products;
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
      {allProducts.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <ProductListCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
