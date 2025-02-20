import { Product } from "@/lib/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Ratings from "../ui/ratings";
import Image from "next/image";

export async function ProductListCard({ product }: { product: Product }) {
  return (
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
  );
}
