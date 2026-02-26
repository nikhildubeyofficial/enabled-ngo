'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal
  } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      updateQuantity(id, newQty);
    }
  };

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-grow bg-white">
          <div className="max-w-7xl mx-auto p-6 sm:p-8 min-h-[calc(100vh-390px)]">
            {/* Breadcrumbs */}
            <div className="mb-4 text-gray-500 text-sm">
              <Link href="/" className="text-gray-400 hover:text-gray-600">Home</Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Optimized List View (Single source of truth for items) */}
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => {
                    if (!item) return null;
                    return (
                      <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                        <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-xl p-2 border border-gray-50 flex items-center justify-center">
                          <img
                            src={item.image || '/Girly.png'}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                            onError={(e) => { e.target.src = '/Girly.png'; }}
                          />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>
                          <p className="text-gray-400 text-sm mb-2">{formatCurrency(item.price)} per unit</p>
                          <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors font-bold text-gray-600"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-black text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors font-bold text-gray-600"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-center sm:text-right min-w-[120px]">
                          <p className="text-[#f0312f] font-black text-xl">
                            {formatCurrency((item.price || 0) * (item.quantity || 1))}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {cartItems.length === 0 && (
                  <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-5xl">🛒</span>
                      <p className="text-gray-500 font-medium">Your cart is empty.</p>
                      <Link href="/products" className="bg-[#f0312f] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}

                {cartItems.length > 0 && (
                  <div className="space-y-8">
                    {/* Additional Functions Section */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                          📝 Order Notes
                        </h4>
                        <textarea
                          placeholder="Special instructions for the recipient or shipping..."
                          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0312f]/20 text-sm h-24"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => router.push('/products')}
                        className="flex-1 md:flex-none border-2 border-gray-100 px-8 py-4 rounded-2xl hover:border-gray-900 transition-all font-bold text-gray-700"
                      >
                        ← Continue Shopping
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to empty your cart?")) {
                            clearCart();
                          }
                        }}
                        className="flex-1 md:flex-none border-2 border-red-50 px-8 py-4 rounded-2xl hover:bg-red-50 transition-all font-bold text-red-500"
                      >
                        Empty Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="flex flex-col">
                  <div className="border border-gray-100 rounded-[32px] p-8 w-full bg-[#fafafa] shadow-xl shadow-gray-100 sticky top-24">
                    <h3 className="text-xl font-black mb-8 text-gray-900 uppercase tracking-tight">Summary</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Subtotal</span>
                        <span className="font-bold text-gray-900">{formatCurrency(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Discount</span>
                        <span className="text-green-600 font-bold">- Rp 0</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Shipping Account</span>
                        <div className="text-right">
                          <p className="text-gray-900 font-bold">Standard</p>
                          <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Select in Checkout</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-2xl font-black pt-4">
                        <span className="text-gray-900">Final Total</span>
                        <span className="text-[#f0312f]">{formatCurrency(cartTotal)}</span>
                      </div>
                    </div>
                    {user ? (
                      <button
                        onClick={() => router.push('/billing')}
                        className="mt-10 w-full bg-[#f0312f] hover:bg-black text-white font-black py-5 rounded-2xl shadow-xl shadow-red-100 transition-all active:scale-95 uppercase tracking-widest text-sm"
                      >
                        Proceed to checkout 🚀
                      </button>
                    ) : (
                      <div className="mt-10 space-y-4">
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                          <p className="text-xs text-center text-[#f0312f] font-bold">Please login to finish your order</p>
                        </div>
                        <button
                          onClick={() => router.push('/login')}
                          className="w-full bg-[#f0312f] hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                          Login to Checkout
                        </button>
                      </div>
                    )}
                    <div className="mt-8 flex justify-center gap-4 border-t pt-8 overflow-x-auto">
                      <div className="bg-gray-100 px-3 py-1.5 rounded text-[10px] font-bold text-gray-400">VISA</div>
                      <div className="bg-gray-100 px-3 py-1.5 rounded text-[10px] font-bold text-gray-400">STRIPE</div>
                      <div className="bg-gray-100 px-3 py-1.5 rounded text-[10px] font-bold text-gray-400">PAYPAL</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
