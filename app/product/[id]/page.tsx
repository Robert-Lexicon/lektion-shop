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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  //todo: check if data is ok
  const data: Product = await res.json();

  return <div>{data.title}</div>;
}
