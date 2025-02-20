import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

{
  /* <Star className="fill-amber-400 stroke-0" /> */
}
export default function Ratings({ rating }: { rating: number }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="grid">
            <div className="flex col-start-1 row-start-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="stroke-amber-400" />
              ))}
            </div>
            <div className="flex col-start-1  row-start-1">
              {Array.from({ length: Math.round(rating) }, (_, i) => (
                <Star key={i} className="fill-amber-400 stroke-0" />
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Rating: {rating}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
