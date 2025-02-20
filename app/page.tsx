import { fetchCategories, fetchProductsByCategory } from "./actions";
import CategorySelect from "@/components/navigation/category-select";
import { Products } from "@/components/products";
import { Suspense } from "react";

//todo make interface for searchParams
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  //const data = await fetchProducts();
  //get category key/value from searchParams, if none, default to electronics
  const { category = "electronics" } = await searchParams;

  const products = fetchProductsByCategory(category);
  const categories = fetchCategories();

  return (
    <main className="space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySelect categories={categories} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Products products={products} />
      </Suspense>
    </main>
  );
}
