import { INVOICE_STATUSES } from "../lib/types";

export function FilterPanel({ selected, onToggle }) {
  return (
    <fieldset className="rounded-2xl border border-ink-200 bg-white/90 p-4 shadow-sm dark:border-ink-700 dark:bg-ink-800/80">
      <legend className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
        Filter by status
      </legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {INVOICE_STATUSES.map((status) => {
          const checked = selected.includes(status);

          return (
            <label
              key={status}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:bg-brand-50 dark:text-ink-100 dark:hover:bg-brand-700/20"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(status)}
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              {status[0].toUpperCase() + status.slice(1)}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
