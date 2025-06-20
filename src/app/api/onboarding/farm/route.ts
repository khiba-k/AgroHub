import { checkUserFarmExists, createFarm, createFarmUser } from '@/actions/onboarding/OnboardingFarmerActions';
import prisma from '@/lib/prisma/prisma';
import { createClient } from '@/lib/supabase/server'; // Or wherever your createClient is located
import { badRequest, conflict, created, serverError, unauthorized } from '@/lib/utils/responseHandler';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Get User Session from cookies
        const supabase = await createClient();

        // 1. Verify User Authentication
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return unauthorized('Unauthorized: User not authenticated');
        }

        const body = await request.json();
        
        // Extract farm data from request body
        const { name, description, district, country, contactNumber1, contactNumber2 } = body;
        const userId = user.id;

        // Validate required fields
        if (!name || !description || !district || !country || !contactNumber1) {
            return badRequest('Missing Required Field(s)')
        }

        // Check if user already has a farm
        const farmExists = await checkUserFarmExists(userId);
        console.log('Farm exists:', farmExists);


        if (farmExists) {
            return conflict(
                'User already has a farm. Please contact support if you need to update your farm details.')
            ;
        }

        // Create the farm
        const farmData = {
            name: name,
            description,
            district,
            country,
            contactNumber1,
            contactNumber2: contactNumber2 || null,
        };
        const newFarm = await createFarm(farmData);

        if (!newFarm) {
            return serverError('Failed to create farm');
        }
        // 2. Create Farm User association
        const farmUser = await createFarmUser(userId, newFarm.id);

        if (!farmUser) {
            return serverError('Failed to create farm user association');
        }

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
            }, { status: 207 });
        }

        return created(newFarm, 'Farm created successfully and user onboarded');

    } catch (error) {
        console.error('Error in farmer onboarding:', error);
        
        // Check if it's a unique constraint violation
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return conflict('Farm with this name already exists for the user');
        }

        return serverError(
            'Internal server error',
            error instanceof Error ? error.message : 'An unexpected error occurred'
        );
    } finally {
        await prisma.$disconnect();
    }
}