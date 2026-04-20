import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { InvoiceCard } from "../components/InvoiceCard";
import { ThemeToggle } from "../components/ThemeToggle";
import { listInvoices } from "../lib/api";
import { INVOICE_STATUSES } from "../lib/types";

export function InvoiceListPage() {
  const [selectedStatuses, setSelectedStatuses] = useState(INVOICE_STATUSES);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && event.target.closest(".relative") === null) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

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
    <main className="mx-auto w-full max-w-7xl animate-rise px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <header className="mb-6 rounded-[32px] bg-gradient-to-r from-brand-700 via-brand-600 to-ink-700 p-6 text-white shadow-xl sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">Invoice Management</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">Invoices</h1>
            <p className="mt-3 text-sm leading-6 text-white/90 sm:text-[15px]">{headingText}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end">
            <ThemeToggle />
            
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Filter by Status
                <span className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-ink-200 bg-white shadow-lg dark:border-ink-700 dark:bg-ink-800 z-10">
                  <div className="p-4 space-y-3">
                    {INVOICE_STATUSES.map((status) => {
                      const isSelected = selectedStatuses.includes(status);
                      return (
                        <label
                          key={status}
                          className="flex cursor-pointer items-center justify-between rounded-none border border-ink-200 bg-ink-50 px-3 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:bg-brand-50 dark:border-ink-700 dark:bg-ink-900/40 dark:text-ink-100 dark:hover:bg-brand-700/20"
                        >
                          <span>{status[0].toUpperCase() + status.slice(1)}</span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleStatus(status)}
                            className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/invoice/new"
              className="inline-flex items-center gap-3 rounded-full bg-brand-500 pl-2 pr-5 py-2 text-sm font-bold text-white shadow transition hover:bg-brand-400"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold leading-none text-brand-500">
                +
              </span>
              New Invoice
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6">

        <section aria-live="polite" className="space-y-4">
          {loading ? <p className="text-sm text-ink-600 dark:text-ink-300">Loading...</p> : null}

          {error ? (
            <div className="rounded-xl border border-danger-300 bg-danger-100 p-4 text-sm font-medium text-danger-700 dark:border-danger-600 dark:bg-danger-500/20 dark:text-danger-300">
              {error}
            </div>
          ) : null}

          {!loading && !error && !invoices.length ? (
            <div className="rounded-[28px] border border-dashed border-ink-300 bg-white/70 p-10 text-center dark:border-ink-600 dark:bg-ink-800/70">
              <div className="mb-6 flex justify-center">
                <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-500">
                  {/* Envelope */}
                  <rect x="30" y="80" width="160" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 30 80 L 110 130 L 190 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  
                  {/* Person body */}
                  <ellipse cx="110" cy="70" rx="16" fill="currentColor"/>
                  <rect x="98" y="88" width="24" height="35" rx="4" fill="currentColor"/>
                  
                  {/* Person jacket */}
                  <path d="M 98 88 L 85 105 L 85 120 Q 85 125 90 125 L 130 125 Q 135 125 135 120 L 135 105 L 122 88" fill="currentColor" opacity="0.8"/>
                  
                  {/* Megaphone */}
                  <g transform="translate(145, 60)">
                    <circle cx="0" cy="0" r="8" fill="currentColor"/>
                    <path d="M 8 -8 L 20 -15 L 20 15 L 8 8 Q 5 0 8 0" fill="currentColor" opacity="0.8"/>
                    <path d="M -2 -3 L -8 0 L -2 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </g>

                  {/* Decorative elements */}
                  <circle cx="35" cy="35" r="4" fill="currentColor" opacity="0.6"/>
                  <rect x="45" y="25" width="8" height="12" rx="2" fill="currentColor" opacity="0.6" transform="rotate(-25 49 31)"/>
                  <path d="M 190 40 L 195 30 L 200 35" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
                  <circle cx="210" cy="50" r="3" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-100">There is nothing here</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-600 dark:text-ink-300">
                Create a new invoice by clicking the "New Invoice" button and get started
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
