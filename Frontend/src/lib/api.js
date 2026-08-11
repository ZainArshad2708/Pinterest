const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
const TOKEN_KEY = "pinterest_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("pinterest_user");
};

const normalizePin = (pin) => ({
  ...pin,
  imageUrl: pin.imageUrl?.startsWith("/") ? `${API_ORIGIN}${pin.imageUrl}` : pin.imageUrl,
});

async function request(path, options = {}) {
  const headers = new Headers(options.headers);
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Request failed");
  return payload;
}

export const authApi = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  me: () => request("/auth/me"),
  updateProfile: (data) => request("/auth/profile", { method: "PATCH", body: JSON.stringify(data) }),
  updatePassword: (data) => request("/auth/password", { method: "POST", body: JSON.stringify(data) }),
  deleteAccount: () => request("/auth/account", { method: "DELETE" }),
  exportData: () => request("/auth/export"),
};

export const boardsApi = {
  list: () => request("/boards"),
  create: (name) => request("/boards", { method: "POST", body: JSON.stringify({ name }) }),
};

export const pinsApi = {
  list: async (search = "") => {
    const response = await request(`/pins${search ? `?search=${encodeURIComponent(search)}` : ""}`);
    return { pins: response.pins.map(normalizePin) };
  },
  create: async (data) => {
    const response = await request("/pins", { method: "POST", body: data });
    return { pin: normalizePin(response.pin) };
  },
  update: async (id, data) => {
    const response = await request(`/pins/${id}`, { method: "PUT", body: data });
    return { pin: normalizePin(response.pin) };
  },
  detail: async (id) => {
    const response = await request(`/pins/${id}`);
    return { pin: normalizePin(response.pin) };
  },
  remove: (id) => request(`/pins/${id}`, { method: "DELETE" }),
};
