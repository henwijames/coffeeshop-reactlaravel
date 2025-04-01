const PageHeading = ({ title, className = "" }) => {
    return (
        <div className={`mb-6 ${className}`}>
            <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
    );
};

export default PageHeading;
