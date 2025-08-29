// src/utils/auth.js

// Base URL (from Vite env or fallback)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://o4dhl0x6p6.execute-api.ap-south-1.amazonaws.com/dev";

// --- Auth token helpers ---
const getAuthToken = () => localStorage.getItem("authToken");
export const clearAuthToken = () => localStorage.removeItem("authToken");

// --- Internal: logout + redirect helper on 401 ---
function forceLogout() {
  clearAuthToken();
  // soft redirect to login
  if (location.pathname !== "/login") {
    location.replace("/login");
  }
}

// --- Internal: fetch with timeout ---
async function fetchWithTimeout(resource, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// --- Generic API call ---
async function apiCall(endpoint, options = {}) {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetchWithTimeout(url, config);

    if (response.status === 401) {
      // Unauthorized -> nuke token and redirect
      forceLogout();
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  } catch (err) {
    console.error(`apiCall failed: ${endpoint}`, err);
    throw err;
  }
}

// --- Auth ---
export async function loginUser(credentials) {
  const response = await apiCall("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (response?.token) {
    localStorage.setItem("authToken", response.token);
  }
  return response;
}

// --- Alerts ---
export async function fetchAlerts() {
  try {
    const { alerts } = await apiCall("/alerts");
    return alerts || [];
  } catch {
    return [];
  }
}

// --- KPI ---
export async function fetchKpiData() {
  try {
    return await apiCall("/kpi");
  } catch {
    return {
      totalAlerts: 0,
      criticalAlerts: 0,
      resolvedAlerts: 0,
      avgResponseTime: "0min",
    };
  }
}

// --- Charts ---
export async function fetchChartData() {
  try {
    const { data } = await apiCall("/chart-data");
    return data || [];
  } catch {
    return [];
  }
}

// --- Query ---
export async function queryData(params) {
  return apiCall("/query", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// --- Anomalies ---
export async function fetchAnomalies() {
  return apiCall("/anomalies", { method: "POST" });
}

// --- Correlated Alerts ---
export async function fetchCorrelatedAlerts() {
  return apiCall("/correlate", { method: "POST" });
}

// --- Ingest Logs (JSON, CSV, Syslog) ---
export async function ingestLogs(body, contentType = "application/json") {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/ingest`, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });
    if (res.status === 401) {
      forceLogout();
      throw new Error("Unauthorized");
    }
    if (!res.ok) throw new Error(`Ingest failed: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("ingestLogs failed:", err);
    throw err;
  }
}
export async function updateAlertStatus(id, payload) {
  return apiCall(`/alerts/${id}/status`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
