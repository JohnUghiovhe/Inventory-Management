import type { Invoice, UpsertInvoicePayload } from "./types";

const API_BASE = "/api";
const LIST_CACHE_TTL_MS = 8000;

type CachedListEntry = {
  value: Invoice[];
  expiresAt: number;
};

const listCache = new Map<string, CachedListEntry>();
const listInFlight = new Map<string, Promise<Invoice[]>>();

function getListCacheKey(statuses: readonly string[]) {
  return statuses.length ? statuses.slice().sort().join(",") : "all";
}

function invalidateListCache() {
  listCache.clear();
  listInFlight.clear();
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({ message: "Request failed" }))) as { message?: string };
    throw new Error(payload.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<T>;
}

export function listInvoices(statuses: readonly string[] = []) {
  const cacheKey = getListCacheKey(statuses);
  const cached = listCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.value);
  }

  const inFlight = listInFlight.get(cacheKey);
  if (inFlight) {
    return inFlight;
  }

  const query = statuses.length ? `?status=${encodeURIComponent(statuses.join(","))}` : "";
  const task = request<Invoice[]>(`/invoices${query}`).then((result) => {
    const next = result ?? [];
    listCache.set(cacheKey, {
      value: next,
      expiresAt: Date.now() + LIST_CACHE_TTL_MS
    });
    return next;
  }).finally(() => {
    listInFlight.delete(cacheKey);
  });

  listInFlight.set(cacheKey, task);
  return task;
}

export function getInvoice(id: string) {
  return request<Invoice>(`/invoices/${id}`);
}

export function createInvoice(payload: UpsertInvoicePayload, asDraft = false) {
  return request<Invoice>(`/invoices?draft=${asDraft}`, {
    method: "POST",
    body: JSON.stringify(payload)
  }).then((result) => {
    invalidateListCache();
    return result;
  });
}

export function updateInvoice(id: string, payload: UpsertInvoicePayload, asDraft = false) {
  return request<Invoice>(`/invoices/${id}?draft=${asDraft}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }).then((result) => {
    invalidateListCache();
    return result;
  });
}

export function removeInvoice(id: string) {
  return request<void>(`/invoices/${id}`, {
    method: "DELETE"
  }).then((result) => {
    invalidateListCache();
    return result;
  });
}

export function markAsPaid(id: string) {
  return request<Invoice>(`/invoices/${id}/mark-paid`, {
    method: "PATCH"
  }).then((result) => {
    invalidateListCache();
    return result;
  });
}