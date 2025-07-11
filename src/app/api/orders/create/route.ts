import { NextRequest } from 'next/server';
import {
    success,
    created,
    badRequest,
    serverError,
} from '@/lib/utils/responseHandler';
import prisma from '@/lib/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        console.log('[ORDER_CREATE_REQUEST]', body);

        const { buyerId, items, totalPrice } = body;

        if (!buyerId || !items || !Array.isArray(items) || !totalPrice) {
            return badRequest('Missing required fields.');
        }

        // Find the AgroHubUser by userId and get their actual id
        const buyer = await prisma.agroHubUser.findUnique({
            where: { userId: buyerId },
            select: { id: true, firstname: true, lastname: true }
        });

        if (!buyer) {
            console.error(`❌ Buyer not found with userId: ${buyerId}`);
            return badRequest(`Buyer with userId ${buyerId} does not exist.`);
        }

        console.log(`✅ Buyer found: ${buyer.firstname} ${buyer.lastname} (ID: ${buyer.id})`);

        // Create sequential orderNumber
        const lastOrder = await prisma.order.findFirst({
            orderBy: { orderNumber: 'desc' },
            select: { orderNumber: true }
        });

        const orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1000;

        // Create Order using the actual buyer.id (not the userId)
        const order = await prisma.order.create({
            data: {
                buyerId: buyer.id, // Use the actual id, not the userId
                orderNumber,
                totalPrice,
            },
        });

        for (const item of items) {
            const {
                produceId,
                unitType,
                selectedQuantity,
                totalPrice: itemTotal,
                orderBreakdown,
            } = item;

            // Create OrderItem
            const orderItem = await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    produceId,
                    unitType,
                    totalQuantity: selectedQuantity,
                    totalPrice: itemTotal,
                },
            });

            // Create OrderItemBreakdown(s)
            for (const breakdown of orderBreakdown) {
                // Find the correct active ProduceListing

                const produceListing = await prisma.produceListing.findFirst({
                    where: {
                        produceId: produceId,
                        farmId: breakdown.farmerId,
                        location: breakdown.location,
                        quantity: {
                            gt: 0
                        },
                        activeDraftListing: {
                            status: 'active'
                        }
                    },
                    select: { id: true }
                });

                if (!produceListing) {
                    console.error(`❌ No active produce listing found for:`, {
                        produceId,
                        farmerId: breakdown.farmerId,
                        location: breakdown.location
                    });
                    throw new Error(`No active produce listing found for produceId: ${produceId}, farmId: ${breakdown.farmerId}, location: ${breakdown.location}`);
                }

                await prisma.orderItemBreakdown.create({
                    data: {
                        orderItemId: orderItem.id,
                        produceListingId: produceListing.id,
                        farmId: breakdown.farmerId,
                        quantity: breakdown.quantity,
                        price: breakdown.price,
                        status: 'PROCESSING',
                    },
                });
            }
        }

        return created({ 
            orderId: order.id,
            orderNumber: order.orderNumber,
            buyerInfo: {
                id: buyer.id,
                name: `${buyer.firstname} ${buyer.lastname}`
            }
        }, 'Order created and set to PROCESSING');
    } catch (error) {
        console.error('[ORDER_CREATE_ERROR]', error);
        return serverError('Failed to create order', error as Error);
    }
}