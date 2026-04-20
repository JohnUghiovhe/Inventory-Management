export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

export function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
