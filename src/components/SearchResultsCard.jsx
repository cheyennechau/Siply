const SearchResultsCard = ({ place }) => {
  const name = place?.name ?? "Unnamed place";
  const address =
    place?.location?.formatted_address ??
    [place?.location?.address, place?.location?.locality]
      .filter(Boolean)
      .join(", ");

  return (
    <div className="rounded-lg p-4 bg-white hover:bg-muted-foreground/8 hover:border hover:border-primary/40 hover:shadow-md transition-all duration-100 ease-in-out flex gap-2 mb-5">
      <img
        src="/placeholder.jpg"
        alt=""
        className="h-20 w-20 rounded-lg object-cover"
      />

      <div className="min-w-0">
        <div className="font-semibold truncate">{name}</div>
        {address && <div className="text-sm opacity-80 mt-1 truncate">{address}</div>}
      </div>
    </div>
  );
};

export default SearchResultsCard;
