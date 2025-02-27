import { fetchProduct } from "@/app/actions";
import { ProductDetailsCard } from "@/components/products/product-details-card";
import { Suspense } from "react";

//dynamic metadata, used if we want to show metadata that is changed depending on variables/params
//https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //we need to await the product here to be able to use it in metadata,
  // that breaks the streaming in the suspense below,
  // we could use loading.tsx page in the folder to still make it ok,
  // but the page will still wait until metadata is complete (this will change in Next.js v15.2)
  const data = await fetchProduct(id);

  return { title: data.title, description: data.description };
}

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
