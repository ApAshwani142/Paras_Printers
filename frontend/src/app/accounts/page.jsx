"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";

export default function AccountPage() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  const router =
    useRouter();

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.replace("/login");
    }
  }, [
    loading,
    user,
    router,
  ]);

  if (
    loading ||
    !user
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-black">
          My Account
        </h1>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-xl font-bold">
            Profile
          </h2>

          <div className="mt-5 space-y-3 text-sm">

            <p>
              <strong>Name:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {user.phone ||
                "Not provided"}
            </p>

            <p>
              <strong>Email verified:</strong>{" "}
              {user.emailVerified
                ? "Yes"
                : "No"}
            </p>

            <p>
              <strong>MFA:</strong>{" "}
              {user.mfaEnabled
                ? "Enabled"
                : "Disabled"}
            </p>

          </div>

          <button
            type="button"
            onClick={async () => {
              await logout();

              router.replace("/login");
            }}
            className="mt-6 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white"
          >
            Logout
          </button>

        </div>
      </div>
    </main>
  );
}