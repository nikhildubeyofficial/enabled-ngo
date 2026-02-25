'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DonationDistributionPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Donations fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter bg-white">
        <Navbar />
        <main className="flex-grow">
          {/* Header Section */}
          <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Donation Distribution
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Our donation distribution program ensures that medical supplies and resources reach pediatric tracheostomy patients across Indonesia who need them most.
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 border border-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">Our Mission</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Enabled. focuses on purchasing tracheostomy tubes and redistributing surplus medical supplies from families in privileged settings or those grieving a loss. We ensure these vital resources reach children who need them most.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through heartfelt collaboration, we help these children live life to the fullest, providing essential medical equipment and support to families across Indonesia.
                </p>
              </div>
              <div className="bg-[#f0312f] rounded-3xl shadow-xl shadow-red-100 p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 tracking-tight">Impact Stories</h2>
                <p className="mb-6 opacity-90 leading-relaxed font-medium">
                  Follow our journey on Instagram to see real stories of families we've helped and the impact of your donations in action.
                </p>
                <a
                  href="https://www.instagram.com/enabled.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-white text-[#f0312f] font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg active:scale-95"
                >
                  Follow @enabled.id
                </a>
              </div>
            </div>

            {/* Dynamic Impact Stories Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Our Impact in Action</h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium">See the real stories and faces behind our donation distribution efforts. Each update represents a family we've helped through medical supplies and support.</p>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {donations.map((donation) => (
                    <div key={donation.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                        <img
                          src={donation.image || '/Girly.png'}
                          alt={donation.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => e.target.src = '/Girly.png'}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-[#f0312f] uppercase tracking-widest shadow-sm">
                            {donation.date}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f0312f] transition-colors tracking-tight">
                          {donation.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-4">
                          {donation.description}
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recipient: {donation.recipient}</span>
                          <span className="text-sm font-bold text-[#f0312f]">View →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Call to Action Grid */}
            <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 text-center tracking-tight">How You Can Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform bg-opacity-50">
                    <span className="text-4xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Donate Supplies</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">Contribute unused medical equipment to help families in need across the country.</p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform bg-opacity-50">
                    <span className="text-4xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Support Growth</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">Your financial help allows us to purchase essential medical equipment for children.</p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform bg-opacity-50">
                    <span className="text-4xl">📣</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Raise Awareness</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">Help us reach more families who need support by sharing our mission with your circle.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
