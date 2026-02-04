import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const StarRating = ({ rating = 0, max = 5, onChange, readOnly = false, sizeClass = "size-5" }) => {
  const [hoverRating, setHoverRating] = useState(null);
  const interactive = !readOnly && typeof onChange === "function";
  const displayRating = interactive ? (hoverRating ?? rating) : rating;

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayRating;

        return (
          <Star
            key={i}
            strokeWidth={1}
            className={cn(
              sizeClass,
              interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default",
              "select-none"
            )}
            color="var(--primary)"
            fill={filled ? "var(--primary)" : "none"}
            onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(null) : undefined}
            onClick={interactive ? () => onChange(starValue) : undefined}
          />
        );
      })}
    </div>
  );
};

export default StarRating;