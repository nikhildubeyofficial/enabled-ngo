import { getProducts, saveProducts } from '@/lib/db';

export async function GET() {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req) {
    try {
        const product = await req.json();
        const products = await getProducts();

        // Simple ID generation if not provided
        if (!product.id) {
            product.id = Date.now().toString();
        }

        products.push(product);
        await saveProducts(products);

        return new Response(JSON.stringify({ success: true, product }), {
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
