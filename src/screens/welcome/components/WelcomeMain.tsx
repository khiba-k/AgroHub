"use client";

import WelcomeFeatures from './WelcomeFeatures';
import WelcomeThemes from './WelcomeThemes';

const WelcomeMain = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Features */}
            <WelcomeFeatures />

            {/* Right Column - Theme Selection */}
            <WelcomeThemes />
        </div>
    )
}

export default WelcomeMain;



