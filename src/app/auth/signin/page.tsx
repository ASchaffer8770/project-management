"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (value: string) => {
    const newErrors: Record<string, string> = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      delete newErrors.email;
    }
    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      validateEmail(value); // Only validate email in real-time
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      validateEmail(value); // Only validate email on blur
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);

    // Minimal password check on submit (just ensure it’s not empty)
    const newErrors: Record<string, string> = { ...errors };
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
    if (!isEmailValid || newErrors.password) return;

    const result = await signIn("credentials", {
      redirect: true,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });

    if (result?.error) {
      setErrors({ submit: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 w-full px-4 py-2 bg-gray-700 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`mt-1 w-full px-4 py-2 bg-gray-700 border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>
          {errors.submit && (
            <p className="text-red-400 text-sm text-center">{errors.submit}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-teal-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}