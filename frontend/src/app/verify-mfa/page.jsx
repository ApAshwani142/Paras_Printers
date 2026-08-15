"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  ShieldCheck,
} from "lucide-react";

import {
  verifyMfa,
  verifyMfaRecovery,
} from "@/lib/auth";

export default function VerifyMfaPage() {
  const router =
    useRouter();

  const [
    mfaToken,
    setMfaToken,
  ] = useState(null);

  const [
    code,
    setCode,
  ] = useState("");

  const [
    recoveryMode,
    setRecoveryMode,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    const token =
      sessionStorage.getItem(
        "mfaToken"
      );

    if (!token) {
      router.replace("/login");
      return;
    }

    setMfaToken(token);
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mfaToken) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (recoveryMode) {
        await verifyMfaRecovery(
          mfaToken,
          code
        );
      } else {
        await verifyMfa(
          mfaToken,
          code
        );
      }

      sessionStorage.removeItem(
        "mfaToken"
      );

      router.replace("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
            <ShieldCheck
              size={28}
            />
          </div>

          <h1 className="text-3xl font-black">
            {recoveryMode
              ? "Use recovery code"
              : "Two-factor authentication"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {recoveryMode
              ? "Enter one of your saved recovery codes."
              : "Enter the 6-digit code from your authenticator app."}
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            required
            autoFocus
            inputMode={
              recoveryMode
                ? "text"
                : "numeric"
            }
            maxLength={
              recoveryMode
                ? 11
                : 6
            }
            placeholder={
              recoveryMode
                ? "ABCDE-12345"
                : "000000"
            }
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-center text-lg font-bold tracking-[0.3em] outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-sky-500 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "Verifying..."
              : "Verify & Continue"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setRecoveryMode(
              !recoveryMode
            );
            setCode("");
            setError("");
          }}
          className="mt-6 w-full text-sm font-semibold text-sky-500"
        >
          {recoveryMode
            ? "Use authenticator app"
            : "Use recovery code"}
        </button>

        <Link
          href="/login"
          className="mt-4 block text-center text-xs text-slate-500"
        >
          Back to login
        </Link>

      </div>
    </main>
  );
}