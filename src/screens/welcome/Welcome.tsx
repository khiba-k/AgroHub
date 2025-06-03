"use client";

import { useEffect, useState } from "react";
import WelcomeHero from "./components/WelcomeHero";
import WelcomeImage from "./components/WelcomeImage";
import WelcomeMain from "./components/WelcomeMain";

export default function Welcome() {
    const [mounted, setMounted] = useState(false);


    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
            <div className="w-full max-w-5xl">
                {/* Hero Section */}
                <WelcomeHero />

                {/* Main Content */}
                <WelcomeMain />

                {/* Hero Image */}
                <WelcomeImage />
            </div>
        </div>
    );
}

