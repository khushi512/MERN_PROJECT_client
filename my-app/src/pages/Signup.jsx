import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../apiCalls/authCalls";
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function SignUp() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!name || !userName || !email || !password) {
      alert("Please enter all the fields");
      return;
    }

    try {
      const data = await signUpUser({ name, userName, email, password });
      if (data && data.user) {
        dispatch(setUserData(data));
        navigate('/home');
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error: ", error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#48c6ef] to-[#6f86d6]">
      <div className="w-[95%] sm:max-w-[400px] h-auto rounded-2xl flex justify-center items-center overflow-hidden shadow-lg">
        {/* Sign Up Form */}
        <div className="w-full h-full bg-white/95 flex flex-col items-center justify-center px-6 sm:px-10 py-10 gap-5 shadow-md rounded-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Join DesignHire</h1>
            <p className="text-gray-500 text-sm mt-1">Connect with top creative talent</p>
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-full h-[44px] mt-2 rounded-lg font-semibold bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white hover:opacity-90 active:scale-[0.99] transition shadow-md"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-3 text-center">
            Already have an account?{" "}
            <span className="text-gray-900 font-medium underline">
              <Link to="/signin">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
