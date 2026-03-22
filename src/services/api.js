const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://9dzgpp9fuh.execute-api.eu-north-1.amazonaws.com/prod";
const ORDER_API_BASE = `${API_BASE}/api/orders`;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && (payload.error || payload.message)) ||
      payload ||
      "Request failed.";
    throw new Error(message);
  }

  return payload;
}

export const productApi = {
  getAll: (signal) => fetch(`${API_BASE}/api/products`, { signal }).then(handleResponse),
  getById: (id, signal) => fetch(`${API_BASE}/api/products/${id}`, { signal }).then(handleResponse),
  create: (data, signal) =>
    fetch(`${API_BASE}/api/products`, {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  update: (id, data, signal) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "PUT",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  delete: (id, signal) =>
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE",
      signal,
    }).then(handleResponse),
};

export const orderApi = {
  getAll: (signal) => fetch(ORDER_API_BASE, { signal }).then(handleResponse),
  getById: (orderId, signal) =>
    fetch(`${ORDER_API_BASE}/${orderId}`, { signal }).then(handleResponse),
  getByUserId: (userId, signal) =>
    fetch(`${ORDER_API_BASE}?userId=${encodeURIComponent(userId)}`, { signal }).then(handleResponse),
  addToCart: (data, signal) =>
    fetch(ORDER_API_BASE, {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  checkout: (orderId, data, signal) =>
    fetch(`${ORDER_API_BASE}/${orderId}`, {
      method: "PATCH",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, action: "checkout" }),
    }).then(handleResponse),
  cancel: (orderId, signal) =>
    fetch(`${ORDER_API_BASE}/${orderId}`, {
      method: "PATCH",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel" }),
    }).then(handleResponse),
};

export { API_BASE, ORDER_API_BASE };
