import prisma from "@/lib/prisma/prisma"

export async function getFarmerDetailsByUserId(userId: string) {
  const farmUser = await prisma.farmUser.findFirst({
    where: { userId },
    include: {
      farm: true,
    },
  });

console.log ("farmUser: ", farmUser)

  if (!farmUser) return null;

  return {
    role: "farmer",
    farmId: farmUser.farm.id,
    farmName: farmUser.farm.name,
    farmDescription: farmUser.farm.description,
    farmDistrict: farmUser.farm.district,
    farmCountry: farmUser.farm.country,
    farmContactNumber1: farmUser.farm.contactNumber1,
    farmContactNumber2: farmUser.farm.contactNumber2,
    farmHasPaymentMethod: farmUser.farm.hasPaymentMethod
    
  };
}

export async function getAgroHubUserByUserId(userId: string) {
    const agroUser = await prisma.agroHubUser.findUnique({
      where: { userId },
    });
  
    if (!agroUser) return null;
  
    return {
      role: "agrohub",
      firstname: agroUser.firstname,
      lastname: agroUser.lastname,
    };
  }
