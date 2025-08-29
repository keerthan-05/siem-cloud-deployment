// Base URL of your backend API (from env or fallback)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://your-api-id.execute-api.region.amazonaws.com/dev";

// -------------------- AUTH TOKEN HELPERS --------------------
const getAuthToken = () => localStorage.getItem("authToken");
export const clearAuthToken = () => localStorage.removeItem("authToken");

// -------------------- GENERIC API CALL --------------------
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
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(`Error calling ${url}:`, error);
    throw error;
  }
}

// -------------------- ALERTS --------------------
export async function fetchAlerts() {
  try {
    return await apiCall("/alerts");
  } catch {
    return [];
  }
}

export async function fetchAlertById(alertId) {
  try {
    return await apiCall(`/alerts/${alertId}`);
  } catch {
    return null;
  }
}

// -------------------- USERS --------------------
export async function fetchUsers() {
  try {
    return await apiCall("/users");
  } catch {
    return [];
  }
}

export async function addUser(userData) {
  try {
    return await apiCall("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch {
    return null;
  }
}

// -------------------- LOGIN --------------------
export async function loginUser(credentials) {
  try {
    const response = await apiCall("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    return response;
  } catch {
    return null;
  }
}

// -------------------- UTILITY --------------------
export async function postData(endpoint, data) {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getData(endpoint) {
  return apiCall(endpoint);
}
