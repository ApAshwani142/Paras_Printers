"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ArrowRight, Building2, Mail, Phone, User} from "lucide-react";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import SocialAuthButtons from "./SocialAuthButtons";

import { useAuth } from "@/context/AuthContext";

export default function AuthCard({
  mode,
}) {
  const isLogin = mode === "login";

  const {login, signup} = useAuth();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setLoading(true);

      const form = new FormData(event.currentTarget);

      try {
        if (isLogin) {
          const response =
            await login({
              email: String(form.get("email")),
              password: String(form.get("password")),
            });

          if (response.requiresMfa) {
            sessionStorage.setItem("mfaToken", response.mfaToken);

            window.dispatchEvent(new Event("routeTransitionStart"));
            window.location.href = "/verify-mfa";
            return;
          }

          window.dispatchEvent(new Event("routeTransitionStart"));
          window.location.href = redirectTo;
        } else {
          await signup({
            name: String(form.get("name")),
            email: String(form.get("email")),
            phone: String(form.get("phone") || "" ),
            password: String(form.get("password")),
          });

          window.dispatchEvent(new Event("routeTransitionStart"));
          window.location.href = "/verify-email";
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full max-w-[470px]">
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
          <Building2 size={20} />
        </div>

        <div>
          <p className="font-black text-slate-950 dark:text-white">
            PARAS PRINTERS
          </p>

          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
            Packaging & Labels
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
          {isLogin
            ? "Welcome Back"
            : "Get Started"}
        </div>

        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          {isLogin
            ? "Sign in to your account"
            : "Create your account"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {isLogin
            ? "Manage your orders and packaging requirements."
            : "Create your account to manage your orders and requirements."}
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {!isLogin && (
          <div className="grid gap-5 sm:grid-cols-2">
            <AuthInput
              label="Full Name"
              name="name"
              placeholder="Ashwani Pandey"
              icon={User}
              autoComplete="name"
            />

            <AuthInput
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              icon={Phone}
              autoComplete="tel"
            />
          </div>
        )}

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder={
            isLogin
              ? "Enter your password"
              : "Create a strong password"
          }
          autoComplete={
            isLogin
              ? "current-password"
              : "new-password"
          }
        />

        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 accent-sky-500"
              />

              <span className="text-xs text-slate-500 dark:text-slate-400">
                Remember me
              </span>
            </label>

            <Link href="/forgot-password" className="text-xs font-semibold text-sky-600 dark:text-sky-400" >
              Forgot password?
            </Link>
          </div>
        )}

        {!isLogin && (
          <label className="flex items-start gap-2">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-sky-500" />

            <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              I agree to the{" "}

              <Link href="/terms" className="font-semibold text-sky-600 dark:text-sky-400" >
                Terms
              </Link>{" "}

              and{" "}

              <Link href="/privacy" className="font-semibold text-sky-600 dark:text-sky-400" >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : isLogin
              ? "Sign In"
              : "Create Account"}

          {!loading && (
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <SocialAuthButtons />

      <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}{" "}

        <Link
          href={
            isLogin
              ? "/signup"
              : "/login"
          }
          className="font-bold text-sky-600 dark:text-sky-400"
        >
          {isLogin
            ? "Create account"
            : "Sign in"}
        </Link>
      </p>
    </div>
  );
}