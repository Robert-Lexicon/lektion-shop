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
  categories: Promise<string[]>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allCategories = use(categories);

  //https://react.dev/reference/react/useCallback
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(name, value);
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const currentCategory = searchParams.get("category") ?? allCategories[0];

  function handleChange(value: string): void {
    //TODO: add so the current search params isn't overwritten
    router.push(`${pathname}?${createQueryString("category", value)}`);
  }

  return (
    <div>
      <Label htmlFor="categorySelect">Category: </Label>
      <Select defaultValue={currentCategory} onValueChange={handleChange}>
        <SelectTrigger id="categorySelect" className="w-[180px]">
          <SelectValue placeholder="Category" />
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
