import React, { useState } from "react";
import { Shield } from "lucide-react";
import { loginUser } from "../utils/auth";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Try real backend login first
      const res = await loginUser(credentials);
      if (res?.token) {
        onLogin(res.token);
        return;
      }
      // If backend didn't return a token, treat as failure
      throw new Error("No token in response");
    } catch (err) {
      console.error("Login failed:", err);

      // ✅ DEMO FALLBACK: allow admin/password even if backend fails
      if (
        credentials.username === "admin" &&
        credentials.password === "password"
      ) {
        onLogin("demo-token-12345"); // stores in App.jsx and proceeds
        setLoading(false);
        return;
      }

      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setCredentials((s) => ({ ...s, [e.target.name]: e.target.value }));

  const useDemoCredentials = () => {
    setCredentials({ username: "admin", password: "password" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Sign in to SIEM Dashboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your credentials below
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Demo credentials helper */}
        <div className="text-center">
          <button
            type="button"
            onClick={useDemoCredentials}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
