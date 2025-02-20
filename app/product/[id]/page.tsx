import { fetchProduct } from "@/app/actions";
import { ProductDetailsCard } from "@/components/products/product-details-card";
import { Suspense } from "react";

//get the dynamic id from the page url and use that to fetch products
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //since params is a promise we have to await it first
  const { id } = await params;
  const data = fetchProduct(id);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsCard product={data} />
    </Suspense>
  );
}
