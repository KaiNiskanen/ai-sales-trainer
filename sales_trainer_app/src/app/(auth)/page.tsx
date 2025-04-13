"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard/workspace');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-cover bg-center pt-10" style={{ backgroundImage: 'url(/landing.png)' }}>
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to AI Sales Trainer</h1>
      <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
