// Prisma action

import { OnboardingAgrohubType } from "@/screens/agrohub/utils/onboardingAgrohubValidation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAgroHubUser = async (data: OnboardingAgrohubType) => {
    try {
        const user = await prisma.agroHubUser.create({
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            userId: "", // Assuming userId is set later or handled elsewhere
        },
        });
        return user;
    } catch (error) {
        console.error('Failed to create AgroHub user:', error);
        throw new Error('Internal server error');
    }
    }