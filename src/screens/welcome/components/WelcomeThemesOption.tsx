import React from 'react';

const WelcomeThemesOption = (
    {
        title,
        icon,
        isSelected,
        onClick,
    }: { // Type is defined inline here
        title: string;
        icon: React.ReactNode;
        isSelected: boolean;
        onClick: () => void;
    }
) => {
    return (
        <div
            className={`
                bg-[#2C2C2C] border border-[#2C2C2C] rounded-xl p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer
                ${isSelected ? 'border-blue-500' : 'hover:bg-[#3A3A3A]'}
                transition-all duration-200 ease-in-out
            `}
            onClick={onClick}
        >
            <div
                className={`
                    p-4 rounded-full
                    ${"bg-[#4A4A4A] text-gray-300"}
                `}
            >
                {icon}
            </div>
            <h6 className="font-medium text-white text-lg">{title}</h6>
        </div>
    );
};

export default WelcomeThemesOption;