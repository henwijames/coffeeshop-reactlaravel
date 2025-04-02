const StatsCard = ({ icon, title, value, trend, color }) => {
    const IconComponent = icon;
    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    <p
                        className={`text-sm mt-2 ${
                            trend > 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {trend > 0 ? "+" : ""}
                        {trend}% from last month
                    </p>
                </div>
                <div className={`p-3 rounded-full bg-primary text-white`}>
                    <IconComponent size={20} className="" />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
