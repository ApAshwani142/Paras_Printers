"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
} from "lucide-react";

import AuthBrandPanel from "@/components/auth/AuthBrandPanel";

import {
  forgotPassword,
} from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [
    email,
    setEmail,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response =
        await forgotPassword(email);

      setMessage(
        response.message
      );
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
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        <AuthBrandPanel />

        <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[470px]">

            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-sky-500"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>

            <div className="mb-8">
              <div className="mb-3 inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                Password Recovery
              </div>

              <h1 className="text-3xl font-black tracking-tight">
                Forgot your password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your email address and we'll send you a secure password reset link.
              </p>
            </div>

            {message && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-sky-500 text-sm font-bold text-white disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}