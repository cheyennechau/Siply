import StarRating from "./StarRating";

const HistoryResultsCard = ({ row, className }) => {
  return (
    <div className={`grid grid-cols-5 gap-20 px-5 py-2 items-center hover:bg-muted-foreground/8 transition-all duration-300 ease-in-out border-b ${className}`}>
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
        <StarRating rating={row.rating} readOnly />
      </div>
    </div>
  );
};

export default HistoryResultsCard;
