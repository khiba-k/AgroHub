import { NextResponse } from 'next/server';
//import prisma from '@/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies} from 'next/headers'; //only in app Router

export async function POST(request: Request){
    const supabase = createRouteHandlerClient({ cookies});// Initialize Supabase client for route handler

    // 1. verify User Authentication
    const { data : { user} } = await supabase.auth.getUser();

    if (!user) {
        //User is not Authenticated 
        return NextResponse.json({ message: 'Unathorized' },{status: 401 });
    }

    try {
        const body = await request.json();
      // Option A: If you send userId in the body, verify it matches the authenticated user
    // const { userId: requestedUserId, companyName, industry, role, onboardingStep, completed } = body;
    // if (requestedUserId && requestedUserId !== user.id) {
    //   return NextResponse.json({ message: 'Forbidden: Mismatching user ID' }, { status: 403 });
    // }

    // Option B: Derive the userId directly from the authenticated user
    const {companyName, industry, role, onboardingStep, completed } = body;
    const userID = user.id; //use the authenticated user's ID

    // Create or update the onboarding profile
    // const onboardingProfile = await prisma.onboardingProfile.upsert({
    //     where: {userID: userID },
    //     update:{
    //         companyName,
    //         industry,
    //         role,
    //         onboardingStep,
    //         completed
    //     },
    //     create: {
    //         userID,
    //         companyName,
    //         industry,
    //         role,
    //         onboardingStep,
    //         completed,
    //     },
    // });

    return NextResponse.json({message: 'Onboarding data saved successfuly', data: null}, { status:201 });
    
    } catch (error) {
        console.error ('Error saving onboading data:', error);
        return NextResponse.json({ message: 'Internal Server Error'},{ status: 500});
    }
}
