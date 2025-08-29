// Base URL of your backend API (API Gateway endpoint)
export const API_BASE_URL = "https://your-api-id.execute-api.region.amazonaws.com/dev";

// -------------------- ALERTS --------------------
// Fetch all alerts
export async function fetchAlerts() {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) throw new Error("Failed to fetch alerts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
}

// Fetch single alert by ID
export async function fetchAlertById(alertId) {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`);
    if (!response.ok) throw new Error("Failed to fetch alert");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching alert ${alertId}:`, error);
    return null;
  }
}

// -------------------- USERS --------------------
// Fetch all users
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Add a new user
export async function addUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to add user");
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

// -------------------- LOGIN --------------------
// User login
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return await response.json(); // Returns token or user info
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

// -------------------- UTILITY --------------------
// Generic POST request
export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("POST request failed");
    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    return null;
  }
}

// Generic GET request
export async function getData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("GET request failed");
    return await response.json();
  } catch (error) {
    console.error(`Error getting ${endpoint}:`, error);
    return null;
  }
}
