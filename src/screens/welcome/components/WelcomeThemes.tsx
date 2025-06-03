"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WelcomeThemesOption from './WelcomeThemesOption';

const WelcomeThemes = () => {
    const router = useRouter();
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const { setTheme } = useTheme();

    const handleThemeSelect = (theme: string) => {
        setSelectedTheme(theme);
        setTheme(theme);
    };

    const handleContinue = () => {
        router.push("/login");
    };
    return (
        <div className="bg-card rounded-xl p-8 shadow-lg border">
            <h2 className="text-2xl font-bold mb-6">Choose Your Theme</h2>
            <p className="text-muted-foreground mb-8">
                Select a theme that works best for you. You can always change this
                later in settings.
            </p>

            <div className="grid grid-cols-1 gap-4">
                <WelcomeThemesOption
                    title="Light"
                    description="Clean, bright interface for daytime use"
                    icon={<Sun className="h-8 w-8" />}
                    isSelected={selectedTheme === "light"}
                    onClick={() => handleThemeSelect("light")}
                />

                <WelcomeThemesOption
                    title="Dark"
                    description="Easy on the eyes for nighttime use"
                    icon={<Moon className="h-8 w-8" />}
                    isSelected={selectedTheme === "dark"}
                    onClick={() => handleThemeSelect("dark")}
                />

                <WelcomeThemesOption
                    title="System"
                    description="Follows your device's theme settings"
                    icon={<Monitor className="h-8 w-8" />}
                    isSelected={selectedTheme === "system"}
                    onClick={() => handleThemeSelect("system")}
                />
            </div>

            <Button className="w-full mt-8" size="lg" onClick={handleContinue}>
                Continue to AgroHub <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}

export default WelcomeThemes;
