import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchProductsByCategory } from "./actions";

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
  console.log(data);
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 my-8 mx-4">
      {data.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <Card className="grid gap-4 h-full">
              <CardHeader>
                <CardTitle>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.image} height={100} width={100} alt="" />
                <p>${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
