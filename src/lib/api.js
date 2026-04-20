const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(payload.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function listInvoices(statuses = []) {
  const query = statuses.length ? `?status=${encodeURIComponent(statuses.join(","))}` : "";
  return request(`/invoices${query}`);
}

export function getInvoice(id) {
  return request(`/invoices/${id}`);
}

export function createInvoice(payload, asDraft = false) {
  return request(`/invoices?draft=${asDraft}`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateInvoice(id, payload, asDraft = false) {
  return request(`/invoices/${id}?draft=${asDraft}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function removeInvoice(id) {
  return request(`/invoices/${id}`, {
    method: "DELETE"
  });
}

export function markAsPaid(id) {
  return request(`/invoices/${id}/mark-paid`, {
    method: "PATCH"
  });
}
