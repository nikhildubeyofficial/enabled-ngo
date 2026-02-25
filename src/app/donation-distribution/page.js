'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Original Instagram posts from enabled.ngo donation distribution feature
const INSTAGRAM_POSTS = [
  { id: 'C5vKb_MSXUF', caption: 'Donating tracheostomy tubes to families in need' },
  { id: 'C4zjFGPSuFJ', caption: 'Medical supply redistribution to pediatric patients' },
  { id: 'C3rYvBqSJ_l', caption: 'Supporting families with essential equipment' },
  { id: 'C2mXuApSo7h', caption: 'Reaching children who need our help most' },
  { id: 'C1lWtZoSmAg', caption: 'Community impact through donations' },
  { id: 'C0kVsYnRlZf', caption: 'Families receiving tracheostomy care supplies' },
];

export default function DonationDistributionPage() {
  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-inter bg-white">
        <Navbar />
        <main className="flex-grow">
          {/* Header */}
          <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Donation Distribution</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Purchasing tracheostomy tubes and redistributing surplus medical supplies from families in privileged settings to children who need them most across Indonesia.
                </p>
              </div>

              {/* Mission + Impact Stories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-4">
                    Enabled. focuses on purchasing tracheostomy tubes and redistributing surplus medical supplies from families in privileged settings or those grieving a loss. We ensure these vital resources reach children who need them most.
                  </p>
                  <p className="text-gray-600">
                    Through heartfelt collaboration, we help these children live life to the fullest, providing essential medical equipment and support to families across Indonesia.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Impact Stories</h2>
                  <p className="text-gray-600 mb-4">
                    Follow our journey on Instagram to see real stories of families we've helped and the impact of your donations in action.
                  </p>
                  <a
                    href="https://www.instagram.com/enabled.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow Us on Instagram
                  </a>
                </div>
              </div>

              {/* Our Impact in Action - Instagram embeds */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Impact in Action</h2>
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  See the real stories and faces behind our donation distribution efforts. Each post represents a family we've helped through medical supplies and support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'C7yHrW4SSl2',
                    'CZ1elY2v8YA',
                    'C-r5pNfS4jx',
                    'C-4yAX5SVnV',
                    'DANfG0ry_7K',
                    'DBtG_I2yxPE',
                  ].map((postId) => (
                    <div key={postId} className="bg-white rounded-lg shadow-lg p-4">
                      <div className="flex justify-center">
                        <iframe
                          src={`https://www.instagram.com/p/${postId}/embed`}
                          width="320"
                          height="440"
                          frameBorder="0"
                          scrolling="no"
                          className="rounded-lg"
                          title={`Instagram post ${postId}`}
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <a
                          href={`https://www.instagram.com/p/${postId}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          View on Instagram →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How You Can Help */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How You Can Help</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      ),
                      title: 'Donate Medical Supplies',
                      desc: 'Contribute unused medical equipment to help families in need',
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      ),
                      title: 'Provide Financial Support',
                      desc: 'Your donations help us purchase essential medical equipment',
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      ),
                      title: 'Spread Awareness',
                      desc: 'Help us reach more families who need support',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  ))}
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
