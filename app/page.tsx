import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  // rating: {
  //   count: number;
  //   rate: number;
  // };
}

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products");
  //todo: check if data is ok
  const data: Product[] = await res.json();

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
