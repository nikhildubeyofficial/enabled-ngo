import { getChildren, saveChildren } from '@/lib/db';

export async function GET() {
    const children = await getChildren();
    return new Response(JSON.stringify(children), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req) {
    try {
        const child = await req.json();
        const children = await getChildren();
        if (!child.id) child.id = Date.now().toString();
        if (!child.createdAt) child.createdAt = new Date().toISOString();
        children.push(child);
        await saveChildren(children);
        return new Response(JSON.stringify({ success: true, child }), {
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

export async function PUT(req) {
    try {
        const updated = await req.json();
        const children = await getChildren();
        const idx = children.findIndex((c) => String(c.id) === String(updated.id));
        if (idx === -1) {
            return new Response(JSON.stringify({ error: 'Child not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        children[idx] = { ...children[idx], ...updated };
        await saveChildren(children);
        return new Response(JSON.stringify({ success: true, child: children[idx] }), {
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

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        const children = await getChildren();
        const filtered = children.filter((c) => String(c.id) !== String(id));
        if (filtered.length === children.length) {
            return new Response(JSON.stringify({ error: 'Child not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        await saveChildren(filtered);
        return new Response(JSON.stringify({ success: true }), {
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
