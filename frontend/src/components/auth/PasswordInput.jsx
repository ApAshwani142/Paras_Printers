"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  label = "Password",
  name = "password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="
          block
          text-sm
          font-semibold
          text-[var(--foreground)]
        "
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[var(--muted-foreground)]
          "
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            pl-11
            pr-12
            text-sm
            text-[var(--foreground)]
            outline-none
            transition-colors

            placeholder:text-[var(--muted-foreground)]

            focus:border-[var(--primary)]
            focus:ring-4
            focus:ring-[var(--primary)]/10
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-lg
            p-2
            text-[var(--muted-foreground)]
            hover:bg-[var(--muted)]
            hover:text-[var(--foreground)]
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}