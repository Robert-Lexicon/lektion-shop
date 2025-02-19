import { fetchProduct } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/interfaces";
import Image from "next/image";

//get the dynamic id from the page url and use that to fetch products
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //since params is a promise we have to await it first
  const { id } = await params;
  const data: Product = await fetchProduct(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex">
        <Image
          className="w-full max-w-[260px] px-4"
          src={data.image}
          height={100}
          width={100}
          alt=""
        />
        <div className="grid gap-2">
          <p>{data.description}</p>
          <p>{data.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
