import features from '../data/WelcomeData'
import WelcomeFeaturesCard from './WelcomeFeaturesCard'

const WelcomeFeatures = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Connect. Trade. Grow.</h2>
            <p className="text-muted-foreground">
                Join thousands of farmers, distributors, and agricultural
                professionals across Africa to share knowledge, trade products,
                and grow your business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {features.map((feature, index) => (
                    <WelcomeFeaturesCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        imageUrl={feature.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default WelcomeFeatures
