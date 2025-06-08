import { createFarmer } from '@/actions/onboarding/OnboardingFarmerActions'; // Import your createFarmer function
import { PrismaClient } from '@prisma/client';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    
    const supabase = createRouteHandlerClient({ cookies });

    // 1. Verify User Authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        
        // Extract farm data from request body
        const { farmName, description, district, country, contactNumber1, contactNumber2 } = body;
        const userId = user.id;

        // Validate required fields
        if (!farmName || !description || !district || !country || !contactNumber1) {
            return NextResponse.json(
                { message: 'Missing required fields: farmName, description, district, country, contactNumber1' }, 
                { status: 400 }
            );
        }

        // Check if user already has a farm
        const existingFarm = await prisma.farm.findUnique({
            where: { userId: userId }
        });

        if (existingFarm) {
            return NextResponse.json(
                { message: 'User already has a farm registered' }, 
                { status: 409 }
            );
        }

        // Create the farm
        const farmData = {
            id: null,
            name: farmName,
            description,
            district,
            country,
            contactNumber1,
            contactNumber2: contactNumber2 || null, // Ensure contactNumber2 is nullable
            userId
        };

        const newFarm = await createFarmer(userId, farmData);

        // Update user metadata to mark onboarding as complete
        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                isOnboarded: true
            }
        });

        if (updateError) {
            console.error('Error updating user metadata:', updateError);
            // Farm was created but metadata update failed
            return NextResponse.json({
                message: 'Farm created but failed to update onboarding status',
                data: newFarm
            }, { status: 207 }); // 207 Multi-Status
        }

        return NextResponse.json({
            message: 'Farm created successfully and onboarding completed',
            data: newFarm
        }, { status: 201 });

    } catch (error) {
        console.error('Error in farmer onboarding:', error);
        
        // Check if it's a unique constraint violation
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { message: 'User already has a farm registered' }, 
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}