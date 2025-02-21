"use client";
import { useCallback } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortingSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //https://react.dev/reference/react/useCallback
  const createQueryString = useCallback(
    (name: string, value: string) => {
      //use the old search params as base for making the new ones
      const newSearchParams = new URLSearchParams(searchParams.toString());
      //add our new value to the key/value pair
      newSearchParams.set(name, value);

      return newSearchParams.toString();
    },
    [searchParams]
  );

  //get the sort value from searchParams and default to asc
  const currentCategory = searchParams.get("sort") ?? "asc";

  //this is called when we change value in the drop down
  function handleChange(value: string): void {
    router.push(`${pathname}?${createQueryString("sort", value)}`);
  }

  return (
    <div>
      <Label htmlFor="sortingSelect">Sort by price: </Label>
      <Select defaultValue={currentCategory} onValueChange={handleChange}>
        <SelectTrigger id="sortingSelect" className="w-[180px]">
          <SelectValue placeholder="Sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"asc"}>Ascending</SelectItem>
          <SelectItem value={"desc"}>Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
