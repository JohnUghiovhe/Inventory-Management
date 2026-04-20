import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";

export function InvoiceCard({ invoice }) {
  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="group block rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-lg dark:border-ink-700 dark:bg-ink-800"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold tracking-wide text-ink-900 dark:text-ink-100">#{invoice.id}</h3>
        <StatusBadge status={invoice.status} />
      </div>

      <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Due {invoice.paymentDue}</p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-ink-700 dark:text-ink-200">{invoice.clientName}</p>
        <p className="text-lg font-bold text-ink-900 transition group-hover:text-brand-600 dark:text-ink-50">
          ${invoice.total.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
