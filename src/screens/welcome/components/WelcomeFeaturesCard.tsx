const WelcomeFeaturesCard = ({
    title,
    description,
    imageUrl,
}: {
    title: string;
    description: string;
    imageUrl: string;
}) => {
    return (
        <div className="relative overflow-hidden rounded-lg h-40 group">
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10"></div>
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-white/80 text-sm">{description}</p>
            </div>
        </div>
    );
}

export default WelcomeFeaturesCard
