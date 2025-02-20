"use client";
import { use } from "react";
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

  const currentCategory = searchParams.get("category") ?? allCategories[0];

  function handleChange(value: string): void {
    //TODO: add so the current search params isn't overwritten
    router.push(`${pathname}?category=${value}`);
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
