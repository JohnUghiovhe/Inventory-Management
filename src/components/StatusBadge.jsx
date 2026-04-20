const statusStyles = {
  draft: "bg-ink-200/80 text-ink-900 dark:bg-ink-700 dark:text-ink-50",
  pending: "bg-amber-200/80 text-amber-900 dark:bg-amber-500/25 dark:text-amber-200",
  paid: "bg-emerald-200/80 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200"
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-w-24 items-center justify-center gap-2 rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${statusStyles[status]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
