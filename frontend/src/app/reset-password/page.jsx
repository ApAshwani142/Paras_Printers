"use client";

import {useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import Link from "next/link";
import {Lock} from "lucide-react";
import {resetPassword} from "@/lib/auth";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [ password, setPassword] = useState("");
  const [ confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await resetPassword(
          token,
          password,
          confirmPassword
        );

      setMessage(response.message);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <div className="w-full max-w-[470px]">

        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
            Password Reset
          </div>

          <h1 className="text-3xl font-black">
            Create a new password
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose a strong password for your account.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-600">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" >
          <div>
            <label className="mb-2 block text-sm font-semibold">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 dark:border-slate-800 dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              required
              minLength={8}
              maxLength={72}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-sky-500 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <Link href="/login" className="mt-6 block text-center text-sm font-semibold text-sky-500" >
          Back to login
        </Link>

      </div>
    </main>
  );
}