import prisma from "@/lib/prisma/prisma";
import { OnboardingFarmType } from "@/screens/onboarding/utils/onboardingFarmValidation";


export const createFarm = async (farmData: OnboardingFarmType) => {
    try {
      const farm = await prisma.farm.create({
        data: {
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

  export const checkUserFarmExists = async (userId: string) => {
    try {
      const farmUser = await prisma.farmUser.findFirst({
        where: { userId },
        select: { id: true },
      });
  
      return Boolean(farmUser);
    } catch (error) {
      console.error('Error checking user farm existence:', error);
      throw error;
    }
  };

  export const createFarmUser = async (userId: string, farmId: string) => {
    try {
      const farmUser = await prisma.farmUser.create({
        data: {
          userId,
          farmId,
          role: 'ADMIN'
        },
      });
      return farmUser;
    } catch (error) {
      console.error('Error creating farm user:', error);
      throw error;
    }
  }
  
  