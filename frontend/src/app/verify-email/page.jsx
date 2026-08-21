"use client";

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {CheckCircle2, XCircle, MailCheck} from "lucide-react";
import {verifyEmail} from "@/lib/auth";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [ status, setStatus ] = useState(token ? "loading" : "pending");
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("pending");
      return;
    }

    const verify = async () => {
      try {
        setStatus("loading");
        const response = await verifyEmail(token);
        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Verification failed."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* Waiting for email */}
        {status === "pending" && (
          <>
            <MailCheck size={52} className="mx-auto mb-5 text-sky-500" />

            <h1 className="text-2xl font-black">
              Check your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Your account has been created successfully.
              We have sent a verification link to your
              email address.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Please open the email and click
              <strong className="mx-1">
                Verify Email Address
              </strong>
              to activate your account.
            </p>

            <Link href="/login" className="mt-6 inline-flex h-11 items-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white" >
              Back to Login
            </Link>
          </>
        )}

        {/* Verifying token */}
        {status === "loading" && (
          <>
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />

            <h1 className="text-2xl font-black">
              Verifying your email...
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Please wait while we verify your email
              address.
            </p>
          </>
        )}

        {/* Successful verification */}
        {status === "success" && (
          <>
            <CheckCircle2 size={52} className="mx-auto mb-5 text-emerald-500" />

            <h1 className="text-2xl font-black">
              Email verified successfully
            </h1>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {message}
            </p>

            <Link href="/login" className="mt-6 inline-flex h-11 items-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white" >
              Continue to Login
            </Link>
          </>
        )}

        {/* Verification failed */}
        {status === "error" && (
          <>
            <XCircle size={52} className="mx-auto mb-5 text-red-500" />

            <h1 className="text-2xl font-black">
              Verification failed
            </h1>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {message}
            </p>

            <Link href="/login" className="mt-6 inline-flex h-11 items-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white" >
              Back to Login
            </Link>
          </>
        )}

      </div>
    </main>
  );
}