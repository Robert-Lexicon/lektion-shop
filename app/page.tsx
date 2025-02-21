import SortingSelect from "@/components/navigation/sorting-select";
import { fetchCategories, fetchProductsByCategory } from "./actions";
import CategorySelect from "@/components/navigation/category-select";
import { Products } from "@/components/products";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

//different loader icons
//TODO: make them look a bit better, show when selecting category
const LoadingSpinner = () => (
  <LoaderCircle className="animate-spin size-16 mx-auto my-32" />
);
const LoadingSelect = () => (
  <div>
    Category: <Skeleton className="w-[180px] h-9" />
  </div>
);
//TODO: make interface for searchParams
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  //const data = await fetchProducts();
  //get category key/value from searchParams, if none, default to electronics
  const { category = "electronics", sort = "asc" } = await searchParams;

  //fetch but don't await here, do the waiting inside the component
  // and use suspense with fallback to show loading animation
  const products = fetchProductsByCategory(category, sort);
  const categories = fetchCategories();

  return (
    <main className="space-y-4 container mx-auto">
      <div className="flex gap-4">
        <Suspense fallback={<LoadingSelect />}>
          <CategorySelect categories={categories} />
        </Suspense>
        <SortingSelect />
      </div>
      <Suspense
        key={category.toString() + sort.toString()}
        fallback={<LoadingSpinner />}
      >
        <Products products={products} />
      </Suspense>
    </main>
  );
}
