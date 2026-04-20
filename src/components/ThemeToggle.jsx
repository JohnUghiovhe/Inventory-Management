import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-ink-300 bg-white/70 px-4 py-2 text-sm font-semibold text-ink-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-ink-600 dark:bg-ink-800 dark:text-ink-100 dark:hover:bg-ink-700"
      aria-label="Toggle light and dark mode"
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
