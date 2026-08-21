import { Barcode, CheckCircle2, Factory, PackageCheck, ShieldCheck, Zap} from "lucide-react";

export default function AuthBrandPanel() {
  return (
    <section className=" relative hidden min-h-screen overflow-hidden border-r border-[var(--border)] bg-[var(--card)] lg:flex lg:w-[48%] flex-col justify-between px-10 py-10 xl:px-16 " >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary glow */}
        <div className=" absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--primary)]/10 blur-3xl " />

        {/* Secondary glow */}
        <div className=" absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/5 blur-3xl " />

        {/* Grid */}
        <div className=" absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:42px_42px] " />
      </div>

      {/* Brand */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className=" flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-lg " >
            <Factory size={22} />
          </div>

          <div>
            <h1 className=" text-lg font-black tracking-tight text-[var(--foreground)] " >
              PARAS PRINTERS
            </h1>

            <p className=" text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)] " >
              Packaging & Labels
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-xl">
        {/* Verification badge */}
        <div className=" mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 " >
          <ShieldCheck size={15} />

          Trusted Packaging Manufacturer
        </div>

        {/* Heading */}
        <h2 className=" text-4xl font-black leading-[1.08] tracking-tight text-[var(--foreground)] xl:text-5xl " >
          Quality labels.
          <br />

          <span className="text-[var(--primary)]">
            Made for your products.
          </span>
        </h2>

        {/* Description */}
        <p className=" mt-6 max-w-lg text-base leading-7 text-[var(--muted-foreground)] " >
          Create your Paras Printers account to explore products, place orders, request custom labels, and keep track of your purchases from one convenient place.
        </p>

        {/* Features */}
        <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5">
          <Feature icon={Barcode} text="High-Quality Labels" />
          <Feature icon={Zap} text="Fast Production" />
          <Feature icon={PackageCheck} text="Custom Packaging" />
          <Feature icon={CheckCircle2} text="Reliable Delivery" />
        </div>
      </div>

      {/* Bottom stats */}
      <div className=" relative z-10 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-6 " >
        <Stat value="10+" label="Years Experience" />
        <Stat value="150K+" label="Labels / Day" />
        <Stat value="Pan-India" label="Delivery" />
      </div>
    </section>
  );
}

/* Feature Component */
function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className=" flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] " >
        <Icon size={16} />
      </div>

      <span className=" text-sm font-medium text-[var(--foreground)] " >
        {text}
      </span>
    </div>
  );
}

/* Stats Component */
function Stat({ value, label }) {
  return (
    <div>
      <p className=" text-lg font-bold text-[var(--foreground)] " >
        {value}
      </p>

      <p className=" mt-0.5 text-[11px] text-[var(--muted-foreground)] " >
        {label}
      </p>
    </div>
  );
}