const PageHeader = ({ title, caption}) => {
    return (
        <div className="mb-10">
            <h1 className="geist-500 text-4xl text-primary mb-1">
                    {title}
            </h1>
            <p className="geist-italic text-lg text-primary">{caption}</p>
        </div>
    )
}

export default PageHeader;