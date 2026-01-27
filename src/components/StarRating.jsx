import { Star } from "lucide-react";

const StarRating = ({ rating, max = 5 }) => {
    if (rating == null) return <span className="text-muted-foreground">--</span>

    return (
        <div className="flex gap-1">
            {Array.from({ length: max }).map((_, i) => {
                const filled = i < rating;

                return (
                    <Star 
                        key={i}
                        strokeWidth={0.5}
                        className="size-5 text-primary"
                        fill={filled ? "var(--primary)" : "none"}
                    />
                )
            })}
        </div>
    );
};

export default StarRating;