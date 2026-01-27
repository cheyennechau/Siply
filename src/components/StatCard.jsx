const StatCard = ({ title, description, children, className = "" }) => {

    return (
        <div className={`flex flex-col items-center justify-center p-5 bg-primary w-full rounded-lg border ${className}`}>
            {title && <h3 className="font-bold">{title}</h3>}
            {description && <p>{description}</p>}
            {children}
        </div>
    );
};

export default StatCard;