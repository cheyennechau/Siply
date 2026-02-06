import StarRating from "./StarRating";

const OverviewHistoryCard = ({ row }) => {

    return (
        <div className="grid grid-cols-5 gap-20 p-3 mt-3 items-center hover:bg-muted-foreground/8 transition-all duration-300 ease-in-out rounded-md text-sm geist-400 cursor-pointer">
            <div>
                {new Date(row.purchased_at).toLocaleDateString()}
            </div>

            <div className="truncate">
                {row.locations?.shop_name ?? "--"}
            </div>

            <div className="truncate">
                {row.drink_name}
            </div>

            <div>
                ${Number(row.price).toFixed(2)}
            </div>

            <div>
                <StarRating rating={row.rating} />
            </div>
        </div>
    );
};

export default OverviewHistoryCard;