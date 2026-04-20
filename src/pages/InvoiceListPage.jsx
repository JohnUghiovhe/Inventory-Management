import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FilterPanel } from "../components/FilterPanel";
import { InvoiceCard } from "../components/InvoiceCard";
import { ThemeToggle } from "../components/ThemeToggle";
import { listInvoices } from "../lib/api";
import { INVOICE_STATUSES } from "../lib/types";

export function InvoiceListPage() {
  const [selectedStatuses, setSelectedStatuses] = useState(INVOICE_STATUSES);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedStatuses.length) {
      setInvoices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    listInvoices(selectedStatuses)
      .then(setInvoices)
      .catch((err) => setError(err.message || "Unable to load invoices"))
      .finally(() => setLoading(false));
  }, [selectedStatuses]);

  const headingText = useMemo(() => {
    if (loading) {
      return "Loading invoices...";
    }
    return `${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`;
  }, [invoices.length, loading]);

  const handleToggleStatus = (status) => {
    setSelectedStatuses((current) => {
      if (current.includes(status)) {
        return current.filter((item) => item !== status);
      }
      return [...current, status];
    });
  };

  return (
    <main className="mx-auto w-full max-w-6xl animate-rise px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8 rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-ink-700 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Invoice Studio</h1>
            <p className="mt-2 text-sm text-white/90">{headingText}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link
              to="/invoice/new"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink-900 shadow transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              New Invoice
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel selected={selectedStatuses} onToggle={handleToggleStatus} />

        <section aria-live="polite" className="space-y-4">
          {loading ? <p className="text-sm text-ink-600 dark:text-ink-300">Loading...</p> : null}

          {error ? (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
              {error}
            </div>
          ) : null}

          {!loading && !error && !invoices.length ? (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white/70 p-8 text-center dark:border-ink-600 dark:bg-ink-800/70">
              <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-100">No invoices found</h2>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                Try changing the selected status filters or create a new invoice.
              </p>
            </div>
          ) : null}

          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </section>
      </div>
    </main>
  );
}
