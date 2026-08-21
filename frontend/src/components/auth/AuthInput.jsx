export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = true,
  autoComplete,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className=" block text-sm font-semibold text-[var(--foreground)]" >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`
            h-12
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            text-sm
            text-[var(--foreground)]
            outline-none
            transition-colors

            placeholder:text-[var(--muted-foreground)]

            focus:border-[var(--primary)]
            focus:ring-4
            focus:ring-[var(--primary)]/10

            ${Icon ? "pl-11 pr-4" : "px-4"}
          `}
        />
      </div>
    </div>
  );
}