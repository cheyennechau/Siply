const DefaultCard = ({ title, description, children, className = "" }) => {

    return (
        <div className={`flex flex-col items-start justify-start p-5 bg-white w-full rounded-lg border ${className}`}>
            {title && <h3 className="font-bold">{title}</h3>}
            {description && <p>{description}</p>}
            {children}
        </div>
    );
};

export default DefaultCard;