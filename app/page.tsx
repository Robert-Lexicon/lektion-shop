import { fetchCategories, fetchProductsByCategory } from "./actions";
import CategorySelect from "@/components/navigation/category-select";
import { Products } from "@/components/products";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

const LoadingSpinner = () => <LoaderCircle className="animate-spin size-16 " />;
const LoadingSelect = () => (
  <div>
    Category: <Skeleton className="w-[180px] h-9" />
  </div>
);
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
    <main className="space-y-4 container mx-auto">
      <Suspense fallback={<LoadingSelect />}>
        <CategorySelect categories={categories} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Products products={products} />
      </Suspense>
    </main>
  );
}
