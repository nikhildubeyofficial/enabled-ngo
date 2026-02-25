'use client';

import { useState, useEffect } from 'react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Reusing getOrders logic via a new API route if needed, or fetching from products for now
            const res = await fetch('/api/admin/orders'); // I'll create this next
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Orders Overview</h2>
                <p className="text-gray-400 font-medium text-sm mt-1">Manage and track customer purchases</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium">Loading orders...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium">No orders found.</td></tr>
                        ) : orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-[#f0312f]">#{order.id}</td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-800">{order.customer}</p>
                                    <p className="text-xs text-gray-400 font-medium">{order.email}</p>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-600">{order.date}</td>
                                <td className="px-6 py-4 text-sm font-black text-gray-900">Rp {Number(order.total).toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
