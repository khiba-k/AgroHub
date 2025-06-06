"use client";
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { useState } from 'react';
import WelcomeContinueBtn from './WelcomeContinueBtn';
import WelcomeThemesOption from './WelcomeThemesOption';

const WelcomeThemes = () => {

    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const { setTheme } = useTheme();

    const handleThemeSelect = (theme: string) => {
        setSelectedTheme(theme);
        setTheme(theme);
    };

    return (
        <div className="flex flex-col justify-between bg-card rounded-xl p-4 shadow-lg border">
            <div className="space-y-4">
                {/* Action Card (Continue or Onboarding CTA) */}
                <div className="bg-card rounded-xl p-4 shadow border">
                    {/* This can conditionally render different buttons */}
                    <WelcomeContinueBtn />
                </div>

                {/* Theme Selection Card */}
                <div className="bg-card rounded-xl p-4 shadow border">
                    <h2 className="text-2xl font-bold mb-6">Choose Your Theme</h2>
                    <p className="text-muted-foreground mb-8">
                        Select a theme that works best for you. You can always change this
                        later in settings.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <WelcomeThemesOption
                            title="Light"
                            icon={<Sun className="h-5 w-5" />}
                            isSelected={selectedTheme === "light"}
                            onClick={() => handleThemeSelect("light")}
                        />
                        <WelcomeThemesOption
                            title="Dark"
                            icon={<Moon className="h-5 w-5" />}
                            isSelected={selectedTheme === "dark"}
                            onClick={() => handleThemeSelect("dark")}
                        />
                        <WelcomeThemesOption
                            title="System"
                            icon={<Monitor className="h-5 w-5" />}
                            isSelected={selectedTheme === "system"}
                            onClick={() => handleThemeSelect("system")}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WelcomeThemes;
