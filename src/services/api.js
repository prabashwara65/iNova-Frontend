const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://inova-alb-1159271538.eu-north-1.elb.amazonaws.com/";

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

export { API_BASE };
