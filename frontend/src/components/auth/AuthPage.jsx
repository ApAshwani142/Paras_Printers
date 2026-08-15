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
          <AuthCard mode={mode} />
        </section>
      </div>
    </main>
  );
}