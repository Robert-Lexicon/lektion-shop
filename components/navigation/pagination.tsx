//import styles from "./pagination.module.css";
import {
  ChevronRight,
  ChevronLast,
  ChevronLeft,
  ChevronFirst,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import LimitSelect from "./limit-select";

const DEFAULT_LIMIT = 10;

const makeLink = (
  path: string,
  text: string,
  Icon: React.ElementType,
  disabled = false
) => {
  //if we want text on the icons we can swap position left/right of text
  //const isLeadingIcon = text === "First" || text === "Previous";
  // const className =
  //   "flex items-center gap-2 justify-center bg-zinc-200 border border-gray-400 rounded p-4 aria-disabled:opacity-50 aria-disabled:pointer-events-none font-bold";
  return disabled ? (
    // <Link className={className} href={path}>
    <Link
      className={buttonVariants({ variant: "outline", size: "icon" })}
      href={path}
    >
      <Icon />
      {/* {isLeadingIcon && <Icon className="text-gray-800" />} */}
      {/* {text}
        {!isLeadingIcon && <Icon />} */}
    </Link>
  ) : (
    <Button variant={"outline"} size={"icon"} disabled aria-disabled="true">
      <Icon />
      {/* {isLeadingIcon && <Icon />}
        {text}
        {!isLeadingIcon && <Icon />} */}
    </Button>
  );
};

export default function PaginationNav({
  path,
  pagesCount,
  offset = 0,
  limit = DEFAULT_LIMIT,
}: {
  path: string;
  pagesCount: number;
  offset: number;
  limit: number;
}) {
  const totalCount = pagesCount;
  const totalPages = limit > 0 ? Math.ceil(totalCount / limit) - 1 : 1;
  //TODO: Restrict current page to min/max
  const currentPage = offset + 1;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="flex items-center justify-center gap-4 mb-4"
    >
      {makeLink(
        `${path}?offset=${0}&limit=${limit}`,
        "First",
        ChevronFirst,
        offset > 0
      )}
      {makeLink(
        `${path}?offset=${offset - 1}&limit=${limit}`,
        "Previous",
        ChevronLeft,
        offset > 0
      )}

      <span>{`Page: ${currentPage}/${totalPages + 1}`}</span>
      <LimitSelect />

      {makeLink(
        `${path}?offset=${offset + 1}&limit=${limit}`,
        "Next",
        ChevronRight,
        offset < totalPages
      )}
      {makeLink(
        `${path}?offset=${totalPages}&limit=${limit}`,
        "Last",
        ChevronLast,
        offset < totalPages
      )}
    </nav>
  );
}
