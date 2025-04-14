"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Main landing page component with login functionality
const HomePage = () => {
  const router = useRouter();
  // State for login form visibility and credentials
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleGetStarted = () => {
    router.push('/workspace');
  };

  // Handle login form submission and navigation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/workspace');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-cover bg-center pt-10" style={{ backgroundImage: 'url(/landing.png)' }}>
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to AI Sales Trainer</h1>
      
      {/* Navigation buttons */}
      {!showLogin ? (
        <div className="space-x-4">
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </div>
      ) : (
        // Login form
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
