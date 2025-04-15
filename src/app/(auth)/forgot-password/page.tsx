"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Password strength validation
  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[^A-Za-z0-9]/.test(formData.password),
  };

  const passwordStrength =
    Object.values(passwordCriteria).filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-error";
    if (passwordStrength <= 4) return "bg-warning";
    return "bg-success";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setErrorMessage("Please choose a stronger password.");
      setIsLoading(false);
      return;
    }

    try {
      // This would be replaced with actual registration logic
      // For demonstration, we'll simulate a successful registration after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // After successful registration, redirect to onboarding or dashboard
      router.push("/onboarding");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">RealSleep</h1>
          <h2 className="mt-6 text-2xl font-bold">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Begin your journey to better sleep
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="John"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {(passwordFocused || formData.password.length > 0) && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Password strength:</span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength <= 2
                          ? "text-error"
                          : passwordStrength <= 4
                            ? "text-warning"
                            : "text-success"
                      }`}
                    >
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-input rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* Password criteria */}
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center">
                      {passwordCriteria.minLength ? (
                        <CheckIcon className="h-3 w-3 text-success mr-2" />
                      ) : (
                        <XMarkIcon className="h-3 w-3 text-error mr-2" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center">
                      {passwordCriteria.hasUppercase ? (
                        <CheckIcon className="h-3 w-3 text-success mr-2" />
                      ) : (
                        <XMarkIcon className="h-3 w-3 text-error mr-2" />
                      )}
                      <span>At least one uppercase letter</span>
                    </div>
                    <div className="flex items-center">
                      {passwordCriteria.hasLowercase ? (
                        <CheckIcon className="h-3 w-3 text-success mr-2" />
                      ) : (
                        <XMarkIcon className="h-3 w-3 text-error mr-2" />
                      )}
                      <span>At least one lowercase letter</span>
                    </div>
                    <div className="flex items-center">
                      {passwordCriteria.hasNumber ? (
                        <CheckIcon className="h-3 w-3 text-success mr-2" />
                      ) : (
                        <XMarkIcon className="h-3 w-3 text-error mr-2" />
                      )}
                      <span>At least one number</span>
                    </div>
                    <div className="flex items-center">
                      {passwordCriteria.hasSpecial ? (
                        <CheckIcon className="h-3 w-3 text-success mr-2" />
                      ) : (
                        <XMarkIcon className="h-3 w-3 text-error mr-2" />
                      )}
                      <span>At least one special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-error text-xs mt-1">
                    Passwords don&apos;t match
                  </p>
                )}
            </div>

            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:text-primary-dark"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary-dark"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
