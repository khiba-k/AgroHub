"use client";
import { getUserObj } from '@/actions/auth/BasicAuthActions';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WelcomeContinueBtn = () => {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOnboarded, setisOnboarded] = useState(false);

    useEffect(() => {
        const checkUserLogin = async () => {
            // Check if user is already logged in
            const user = await getUserObj();
            if (user) {
                setIsLoggedIn(true);
            }
        };
        checkUserLogin();
    }, [router]);

    const handleContinue = () => {
        if (isLoggedIn) {
            // If user is logged in, redirect to AgroHub
            router.push('/dashboard');
        } else {
            // If not logged in, redirect to login page
            router.push('/login');
        }
    };

    const handleContinueForFarmers = () => {
        // Handle continue for farmers
        // This could be a different route or action
        router.push('/farmer/register');
    };

    const handleContinueForConsumers = () => {
        // Handle continue for consumers
        // This could be a different route or action
        router.push('/consumer/register');
    };

    return (
        <>
            {isLoggedIn ? (<div className='h-full'>
                <Button
                        // Reverted to hardcoded dark button colors for consistency
                        className="w-full bg-[#232323] text-white hover:bg-[#323232] rounded-xl py-6 text-lg flex items-center justify-center"
                        size="lg"
                        onClick={handleContinue}
                    >
                        Continue to AgroHub <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
            </div>) : (
               
                <div className="flex flex-col items-center w-full">
                    {/* "Continue to AgroHub" text - Changed to text-foreground to be theme-aware */}
                    <p className="text-center text-lg font-semibold text-foreground mb-4">
                        Continue to AgroHub
                    </p>

               {/* Button for Farmers - Reverted to hardcoded dark button colors */}
               <div className='w-full'>
                    <Button
                         className="w-full bg-[#232323] hover:bg-[#323232] text-white rounded-xl py-6 text-sm transition-all flex items-center justify-center"
                         size="lg"
                         onClick={handleContinueForFarmers}
                    >
                        <span>For Farmers</span> <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>

                   {/* Button for Consumers - Reverted to hardcoded dark button colors */}
                    {/* <Button
                        className="w-full bg-[#232323] hover:bg-[#323232] text-white rounded-xl py-6 text-sm transition-all flex items-center justify-between"
                        size="lg"
                        onClick={handleContinueForConsumers}
                    >
                        <span>For Consumers</span> <ArrowRight className="ml-2 h-6 w-6" />
                    </Button> */}
                </div>
               </div> 
            )}
        </>
    )
}

export default WelcomeContinueBtn
