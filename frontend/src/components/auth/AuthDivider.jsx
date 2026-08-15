export default function AuthDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

      <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-slate-400">
        Or continue with
      </span>

      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}