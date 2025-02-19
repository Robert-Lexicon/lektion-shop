import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
    <ul className="grid">
      {data.map((product) => (
        <li key={product.id}>
          <Card>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}
