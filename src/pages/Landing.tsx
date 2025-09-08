import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold text-[#80d8ff] mb-12 drop-shadow-lg text-center">
        Free Space : Second Brain App
      </h1>
      <div className="flex gap-6">
        <Link
          to="/signup"
          className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold shadow-md"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="px-8 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white font-semibold shadow-md"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
