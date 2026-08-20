import { Suspense } from "react";
import AuthBrandPanel from "./AuthBrandPanel";
import AuthCard from "./AuthCard";

export default function AuthPage({ mode }) {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <div className="flex min-h-screen">
        {/* Left branding section */}
        <AuthBrandPanel />

        {/* Right authentication section */}
        <section
          className="
            flex min-h-screen
            flex-1
            items-center
            justify-center
            overflow-y-auto
            bg-[var(--background)]
            px-5 py-10
            sm:px-8
            lg:px-12
            xl:px-16
          "
        >
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
              </div>
            }
          >
            <AuthCard mode={mode} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}