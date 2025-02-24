"use server";
//so that we are sure nothing gets sent to the client
import { Product } from "@/lib/interfaces";
import { notFound } from "next/navigation";

//to test delayed response times
// function delay(ms:number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//arrow function
export const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  //todo: check if data is ok
  const data: Product[] = await res.json();
  return data;
};

export const fetchProductsByCategory = async (
  category: string | string[],
  sort: string | string[]
) => {
  //TODO: handle array
  //await delay(5000); // Wait for 5 seconds;
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}?sort=${sort}`
  );
  if (!res.ok) throw new Error("error");

  const data: Product[] = await res.json();
  return data;
};

//"vanlig" function, spelar ingen roll för funktion men kan vara bra göra skillnad på
export async function fetchProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  //TODO: check if data is ok

  //if not in a try catch it will bubble up to the page that calls this function
  //we can also check against res.status (200=ok) and so on
  if (!res.ok) throw new Error("not ok!");

  //no use since the type is still json but the response body is null, so we can't parse that into json
  //const contentType = res.headers.get("Content-Type");
  //console.log("contentType", contentType);

  //if we have contentLength 0 we have no content so redirect to not found
  //not all apis use this!
  const contentLength = res.headers.get("Content-Length");
  if (contentLength === "0") {
    return notFound();
  }

  //we could parse as text first and see if text is empty, then parse that to avoid that res.json() throws an error
  // const text = await res.text();
  // if (!text) {
  //   throw new Error("No content");
  // }

  //const data : Product = JSON.parse(text)

  //we could also make a try catch for the res.json() and bubble that upwards to error page
  //   try {
  //     const data: Product = await res.json();
  //     return data;
  //   } catch (error)
  //   { throw new Error("???")}

  const data: Product = await res.json();
  return data;
}

export async function fetchCategories() {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  //TODO: check if data is ok
  //await delay(5000); // Wait for 5 seconds;

  //another option with error handling is to send an error message back and to deal with that message where the method is called
  if (!res.ok) {
    return {
      error: `${res.status} ${res.statusText}`,
    };
  }

  const data: string[] = await res.json();
  return data;
}
