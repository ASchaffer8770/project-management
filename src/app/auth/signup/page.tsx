"use client";

import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const newErrors: Record<string, string> = { ...errors };

    switch (name) {
      case "fullName":
        if (!value || value.length < 2) {
          newErrors.fullName = "Full name must be at least 2 characters long";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value || value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else {
          delete newErrors.password;
        }
        if (
          formData.passwordConfirm &&
          value !== formData.passwordConfirm
        ) {
          newErrors.passwordConfirm = "Passwords do not match";
        } else {
          delete newErrors.passwordConfirm;
        }
        break;
      case "passwordConfirm":
        if (!value || value !== formData.password) {
          newErrors.passwordConfirm = "Passwords do not match";
        } else {
          delete newErrors.passwordConfirm;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key as keyof typeof formData])
    );
    if (!isValid) return;

    console.log("Sign-up data:", formData);
    setErrors({ submit: "Sign-up not implemented yet—stay tuned!" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 w-full px-4 py-2 bg-gray-700 border ${
                errors.fullName ? "border-red-500" : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
            )}
          </div>
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
              onBlur={handleBlur}
              required
              className={`mt-1 w-full px-4 py-2 bg-gray-700 border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 w-full px-4 py-2 bg-gray-700 border ${
                errors.passwordConfirm ? "border-red-500" : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400`}
              placeholder="Confirm your password"
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-400">
                {errors.passwordConfirm}
              </p>
            )}
          </div>
          {errors.submit && (
            <p className="text-red-400 text-sm text-center">{errors.submit}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-teal-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}