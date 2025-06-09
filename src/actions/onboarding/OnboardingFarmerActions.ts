import { OnboardingFarmerType } from "@/screens/onboarding/utils/onboardingFarmerValidation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFarmer = async (userId: string, farmData: OnboardingFarmerType) => {
    try {
      const farm = await prisma.farm.create({
        data: {
          userId,
          name: farmData.name,
          description: farmData.description,
          district: farmData.district,
          country: farmData.country,
          contactNumber1: farmData.contactNumber1,
          contactNumber2: farmData.contactNumber2,
        },
      });
      return farm;
    } catch (error) {
      console.error('Error creating farm:', error);
      throw error;
    }
  };