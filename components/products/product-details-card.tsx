import { Product } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Ratings from "../ui/ratings";
import Image from "next/image";

export async function ProductDetailsCard({
  product,
}: {
  product: Promise<Product>;
}) {
  const productDetails = await product;
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="font-bold text-xl">{productDetails.title}</h1>
        </CardTitle>
        <CardDescription>Category: {productDetails.category}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2">
        <Image
          className="w-full max-w-[260px] px-4 object-contain"
          src={productDetails.image}
          height={100}
          width={100}
          alt=""
        />
        <div className="grid gap-2 px-4">
          <div className="flex gap-2 items-center">
            <span>Rating:</span> <Ratings rating={productDetails.rating.rate} />
          </div>
          <p className="text-pretty">{productDetails.description}</p>
          <p className="text-end text-4xl font-semibold">
            ${productDetails.price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
