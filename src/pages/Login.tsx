import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
        if (token) {
          localStorage.setItem("jwtToken", token);
          setSuccess(true);
          setTimeout(() => {
            navigate("/main");
          }, 2000);
        } else {
          setError("Token missing in server response.");
        }
      } else {
        const text = await response.text();
        setError(text || "Signin failed");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="signin-container bg-[#1e1e2e] p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-center text-[#80d8ff] mb-5 text-2xl font-extrabold drop-shadow-lg">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-md mb-2 text-[#cfd8dc] focus:outline-none focus:ring-2 focus:ring-[#80d8ff] focus:bg-[#263238]">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-[#37474f] rounded-md bg-[#263238] text-[#cfd8dc] placeholder-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#80d8ff]"
          />
          <label htmlFor="password" className="block text-md mb-2 text-[#cfd8dc]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-[#37474f] rounded-md bg-[#263238] text-[#cfd8dc] placeholder-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#80d8ff]"
          />
          {error && (
            <p className="text-red-500 mb-4 text-sm font-semibold">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-[#2962ff] text-white rounded-md text-lg hover:bg-[#0039cb] transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#b0bec5]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#80d8ff] hover:underline transition-colors">
            SignUp here
          </Link>
          .
        </p>
      </div>
      {success && (
        <div className="fixed text-lg top-5 right-5 bg-green-600 text-white rounded-md p-4 shadow-lg z-50 text-center">
          Login successful! Granting Access
        </div>
      )}
    </div>
  );
};

export default Login;
