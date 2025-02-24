import { Product } from "@/lib/interfaces";
import Link from "next/link";
import { ProductListCard } from "./product-list-card";

export async function Products({ products }: { products: Promise<Product[]> }) {
  const allProducts = await products;

  //if there are no products, show that to the user instead of a blank page.
  if (allProducts.length <= 0) {
    return <div>No products found in this category</div>;
  }
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
