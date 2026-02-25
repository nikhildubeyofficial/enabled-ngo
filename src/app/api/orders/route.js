import { getOrders, saveOrders } from '@/lib/db';

export async function POST(req) {
    try {
        const orderData = await req.json();
        const orders = await getOrders();

        const newOrder = {
            id: `ORD-${Date.now()}`,
            customer: orderData.address.fullName,
            email: orderData.address.email,
            total: orderData.total || 150000, // Fallback if not provided
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
            address: orderData.address,
            items: orderData.items || []
        };

        orders.push(newOrder);
        await saveOrders(orders);

        return new Response(JSON.stringify({ success: true, order: newOrder }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
