import { Star } from "lucide-react";
import { useState } from "react";

const StarRating = ({ rating = 0, max = 5, onChange }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const displayRating = hoverRating ?? rating;

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayRating;

        return (
          <Star
            key={i}
            strokeWidth={1}
            className="size-5 cursor-pointer transition-transform hover:scale-110"
            color="var(--primary)"
            fill={filled ? "var(--primary)" : "none"}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => onChange?.(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;