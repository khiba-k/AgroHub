import { Sun } from 'lucide-react'

const WelcomeHero = () => {
    return (
        <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
                <div className="relative h-24 w-24">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sun className="h-16 w-16 text-primary" />
                    </div>
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Welcome to AgroHub
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                The Agricultural Social Network for Africa
            </p>
        </div>
    )
}

export default WelcomeHero
