import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] flex flex-col items-center justify-center px-4 py-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mb-12 space-y-6">
        <h1 className="text-white text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to DesignHire
        </h1>
        <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Your platform to connect with top creative talent and explore stunning interior design projects.
          Whether you’re hiring or seeking opportunities — we make it seamless.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition transform"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="bg-white text-[#4f46e5] font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 hover:text-[#4f46e5] transition transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg transform hover:-translate-y-2 transition">
          <h2 className="text-white text-xl font-semibold mb-2">Seamless Hiring</h2>
          <p className="text-white text-sm">
            Post your projects and find the perfect designer effortlessly.
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-lg transform hover:-translate-y-2 transition">
          <h2 className="text-white text-xl font-semibold mb-2">Discover Talent</h2>
          <p className="text-white text-sm">
            Explore top designers and interior creatives with amazing portfolios.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg transform hover:-translate-y-2 transition">
          <h2 className="text-white text-xl font-semibold mb-2">Collaborate Beautifully</h2>
          <p className="text-white text-sm">
            Tools and messaging built to make designer-client collaboration seamless.
          </p>
        </div>
      </div>

      {/* Empowering Text */}
      <p className="text-white text-lg sm:text-xl max-w-2xl text-center leading-relaxed">
        ✨ Empowering designers and clients to collaborate beautifully.
      </p>
    </div>
  );
}

export default Landing;
