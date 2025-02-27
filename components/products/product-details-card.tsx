import { Product } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Ratings from "../ui/ratings";
import Image from "next/image";
import AddToCartButton from "./addtocart-button";
import { ShoppingBasket } from "lucide-react";

export async function ProductDetailsCard({
  product,
}: {
  product: Promise<Product>;
}) {
  const productDetails = await product;
  return (
    <Card className=" max-w-[120ch] mx-auto">
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="font-bold text-xl">{productDetails.title}</h1>
        </CardTitle>
        <CardDescription>Category: {productDetails.category}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2">
        <div className="flex justify-center">
          <Image
            className="w-full max-w-[260px] px-4 object-contain"
            src={productDetails.image}
            height={100}
            width={100}
            alt=""
          />
        </div>
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
      <CardFooter className="flex justify-end">
        <AddToCartButton className="bg-red-500" product={productDetails}>
          <ShoppingBasket /> Add to cart
        </AddToCartButton>
      </CardFooter>
    </Card>
  );
}
