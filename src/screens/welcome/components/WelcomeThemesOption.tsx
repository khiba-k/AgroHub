import React from 'react';

const WelcomeThemesOption = (
    {
        title,
        description,
        icon,
        isSelected,
        onClick,
    }: {
        title: string;
        description: string;
        icon: React.ReactNode;
        isSelected: boolean;
        onClick: () => void;
    }
) => {
    return (
        <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            onClick={onClick}
        >
            <div className="flex items-center space-x-4">
                <div
                    className={`p-2 rounded-full ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                    {icon}
                </div>
                <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default WelcomeThemesOption
