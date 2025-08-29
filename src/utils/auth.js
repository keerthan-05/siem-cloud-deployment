// Use Vite env variable or fallback
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://o4dhl0x6p6.execute-api.ap-south-1.amazonaws.com/dev";

// Helpers for auth token
const getAuthToken = () => localStorage.getItem("authToken");
export const clearAuthToken = () => localStorage.removeItem("authToken");

// Generic API call
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

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
};

// --- Auth ---
export const loginUser = async (credentials) => {
  const response = await apiCall("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.token) {
    localStorage.setItem("authToken", response.token);
  }
  return response;
};

// --- Alerts ---
export const fetchAlerts = async () => {
  try {
    const { alerts } = await apiCall("/alerts");
    return alerts || [];
  } catch {
    return [];
  }
};

// --- KPI ---
export const fetchKpiData = async () => {
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
};

// --- Charts ---
export const fetchChartData = async () => {
  try {
    const { data } = await apiCall("/chart-data");
    return data || [];
  } catch {
    return [];
  }
};

// --- Query ---
export const queryData = async (params) => {
  return apiCall("/query", {
    method: "POST",
    body: JSON.stringify(params),
  });
};

// --- Anomalies ---
export const fetchAnomalies = async () => {
  return apiCall("/anomalies", { method: "POST" });
};

// --- Correlated Alerts ---
export const fetchCorrelatedAlerts = async () => {
  return apiCall("/correlate", { method: "POST" });
};

// --- Ingest Logs (JSON, CSV, Syslog) ---
export const ingestLogs = async (body, contentType = "application/json") => {
  try {
    const res = await fetch(`${API_BASE_URL}/ingest`, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });
    if (!res.ok) throw new Error(`Ingest failed: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("ingestLogs failed:", err);
    throw err;
  }
};
