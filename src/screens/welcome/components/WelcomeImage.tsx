
const WelcomeImage = () => {
    return (
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10"></div>
            <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=90"
                alt="African agricultural landscape"
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-20">
                <h2 className="text-3xl font-bold text-white">
                    Transforming African Agriculture
                </h2>
                <p className="text-white/90 max-w-2xl">
                    Join our community of farmers, distributors, and agricultural
                    professionals across Africa.
                </p>
            </div>
        </div>
    )
}

export default WelcomeImage
