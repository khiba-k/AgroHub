import prisma from '@/lib/prisma/prisma'
import { ProduceFormData } from '@/screens/agrohub/utils/produceFromValidation'


export const createProduce = async (data: ProduceFormData) => {
    try {
        const produce = await prisma.produce.create({
            data: {
                category: data.category,
                name: data.name,
                type: data.type ?? '',
                pricePerUnit: data.pricePerUnit,
                unitType: data.unitType,
            },
        })
        return produce
    } catch (error) {
        console.error('Failed to create produce:', error)
        throw new Error('Internal server error')
    }
}

export async function getProduce() {
    return prisma.produce.findMany({
        select: {
            id: true,
            category: true,
            name: true,
            type: true,
            pricePerUnit: true,
            unitType: true,
        },
    })
}
