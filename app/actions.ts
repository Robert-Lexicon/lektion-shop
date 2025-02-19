"use server"
//so that we are sure nothing gets sent to the client
import { Product } from "@/lib/interfaces";

//arrow function 
export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    //todo: check if data is ok
    const data: Product[] = await res.json();
    return data
}

export const fetchProductsByCategory = async (category: string | string[]) => {
    //todo handle array
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    //todo: check if data is ok

    const data: Product[] = await res.json();
    return data
}


//"vanlig" function, spelar ingen roll för funktion men kan vara bra göra skillnad på
export async function fetchProduct(id: string) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    //todo: check if data is ok
    const data: Product = await res.json();
    return data;
}
