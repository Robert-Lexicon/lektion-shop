"use client";
import { use, useCallback } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategorySelect({
  categories,
}: {
  categories: Promise<string[] | { error: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allCategories = use(categories);

  //check if there is an error message or if the length of the categories is/less than 0 if so throw an error
  //if there are no categories something is probably wrong with the api anyway...
  if ("error" in allCategories || allCategories.length <= 0) {
    throw new Error("No categories found");
  }

  //https://react.dev/reference/react/useCallback
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(name, value);
      return newSearchParams.toString();
    },
    [searchParams]
  );

  //TODO: here we should also check to see if the chosen category is in the list of categories, if not set to undefined and let the user chose
  const currentCategory = searchParams.get("category") ?? allCategories[0];

  function handleChange(value: string): void {
    router.push(`${pathname}?${createQueryString("category", value)}`);
  }

  return (
    <div>
      <Label htmlFor="categorySelect">Category: </Label>
      <Select defaultValue={currentCategory} onValueChange={handleChange}>
        <SelectTrigger id="categorySelect" className="w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {allCategories.map((category, index) => (
            <SelectItem key={index} value={category}>
              <span className="capitalize">{category}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
