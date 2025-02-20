import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories, fetchProductsByCategory } from "./actions";
import CategorySelect from "@/components/navigation/category-select";
import Ratings from "@/components/ui/ratings";

//todo make interface for searchParams
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  //const data = await fetchProducts();
  //get category key/value from searchParams, if none, default to electronics
  const { category = "electronics" } = await searchParams;

  const data = await fetchProductsByCategory(category);
  const categories = fetchCategories();
  console.log(data);
  return (
    <main className="space-y-4">
      <CategorySelect categories={categories} />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {data.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <Card className="grid  h-full">
                <CardHeader className="grid justify-items-center text-center space-y-4">
                  <Image
                    className="w-full max-w-[12rem] max-h-[200px] object-contain"
                    src={product.image}
                    height={100}
                    width={100}
                    alt=""
                  />
                  <Ratings rating={product.rating.rate} />
                  <CardTitle>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl font-semibold">${product.price}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
