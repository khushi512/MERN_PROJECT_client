import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../apiCalls/authCalls";
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!userName || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const data = await signInUser({ userName, password });
      if (data && data.user) {
        dispatch(setUserData(data));
        navigate('/home');
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Signin error: ", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#48c6ef] to-[#6f86d6]">
      <div className="w-[95%] lg:max-w-[400px] h-auto rounded-2xl flex justify-center items-center overflow-hidden shadow-lg">
        {/* Sign In Form */}
        <div className="w-full h-full bg-white/95 flex flex-col items-center justify-center px-6 sm:px-10 py-10 gap-5 shadow-md rounded-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Sign In to DesignHire
            </h2>
          </div>
          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              id="userName"
              placeholder="Username"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="password"
              placeholder="Password"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Forgot password */}
          <div className="w-[95%] text-right mt-1 text-sm text-blue-600 cursor-pointer hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {/* Button */}
          <button
            onClick={handleSignIn}
            className="w-[95%] h-[44px] mt-4 rounded-lg font-semibold bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white hover:opacity-90 active:scale-[0.99] transition shadow-md"
          >
            Sign in
          </button>
          {/* Footer text */}
          <p className="text-gray-500 text-sm mt-3 text-center">
            Want to create a new account?{" "}
            <span className="text-gray-900 font-medium underline underline-offset-4">
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
