import { fetchProduct } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Ratings from "@/components/ui/ratings";
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
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="font-bold text-xl">{data.title}</h1>
        </CardTitle>
        <CardDescription>Category: {data.category}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2">
        <Image
          className="w-full max-w-[260px] px-4 object-contain"
          src={data.image}
          height={100}
          width={100}
          alt=""
        />
        <div className="grid gap-2 px-4">
          <div className="flex gap-2 items-center">
            <span>Rating:</span> <Ratings rating={data.rating.rate} />
          </div>
          <p className="text-pretty">{data.description}</p>
          <p className="text-end text-4xl font-semibold">${data.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
