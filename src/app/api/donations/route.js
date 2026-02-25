import { getDonations } from '@/lib/db';

export async function GET() {
    try {
        const donations = await getDonations();
        return new Response(JSON.stringify(donations), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
