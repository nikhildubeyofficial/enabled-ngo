import { getOrders, saveOrders } from '@/lib/db';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        let orders = await getOrders();

        if (email) {
            orders = orders.filter(o => o.email === email);
        }

        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        const orderData = await req.json();
        const orders = await getOrders();

        // Standardized Order Schema
        const newOrder = {
            _id: `ORD-${Date.now()}`,
            id: `ORD-${Date.now()}`, // Keep both for safety
            customer: orderData.address.fullName,
            email: orderData.address.email,
            totalPrice: orderData.totalPrice || orderData.total || 0,
            status: 'Processing',
            createdAt: new Date().toISOString(),
            address: {
                ...orderData.address,
                email: orderData.address.email || orderData.email // Fallback
            },
            products: orderData.products || orderData.items || []
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


