import React, { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        {/* Toggle buttons */}
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 p-3 text-center ${mode === "login" ? "border-b-4 border-blue-500 font-semibold" : "text-gray-500"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 p-3 text-center ${mode === "register" ? "border-b-4 border-blue-500 font-semibold" : "text-gray-500"}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* Render the matching form */}
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="w-full border p-2 rounded mb-3" placeholder="Email" />
      <input className="w-full border p-2 rounded mb-3" placeholder="Password" type="password" />
      <button className="w-full bg-blue-600 text-white p-2 rounded-xl">Submit</button>
    </div>
  );
}

function RegisterForm() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="w-full border p-2 rounded mb-3" placeholder="Email" />
      <input className="w-full border p-2 rounded mb-3" placeholder="Password" type="password" />
      <button className="w-full bg-blue-600 text-white p-2 rounded-xl">Submit</button>
    </div>
  );
}
