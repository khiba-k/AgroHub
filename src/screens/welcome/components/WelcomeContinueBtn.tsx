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
            {isOnboarded ? (<div className='h-full'>
                <Button
                    className="w-full bg-muted text-muted-foreground hover:bg-muted/80"
                    size="lg"
                    onClick={handleContinue}
                >
                    Continue to AgroHub <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>) : (
                <div className='grid grid-cols-2 gap-2'>
                    <Button
                        className="w-full bg-muted text-muted-foreground hover:bg-muted/80"
                        size="lg"
                        onClick={handleContinueForFarmers}
                    >
                        For Farmers <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                        className="w-full bg-muted text-muted-foreground hover:bg-muted/80"
                        size="lg"
                        onClick={handleContinueForConsumers}
                    >
                        For Consumers <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    )
}

export default WelcomeContinueBtn
