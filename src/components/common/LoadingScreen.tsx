import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white p-6 rounded-2xl inline-block mb-6 shadow-xl">
          <img 
            src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
            alt="NanoLink Logo" 
            className="w-16 h-16 animate-pulse"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">NanoLink</h1>
        <p className="text-blue-100 mb-6">Loading your crypto platform...</p>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}