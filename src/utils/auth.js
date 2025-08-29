// Base URL from environment or fallback
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  'https://o4dhl0x6p6.execute-api.ap-south-1.amazonaws.com/dev';

// Get stored auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Generic API call helper
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication
export const loginUser = async credentials => {
  const response = await apiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  // Store token for subsequent calls
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  return response;
};

// Fetch alerts list
export const fetchAlerts = async () => {
  try {
    const { alerts } = await apiCall('/alerts');
    return alerts || [];
  } catch (e) {
    console.error('fetchAlerts failed:', e);
    return []; // no mock fallback in production
  }
};

// Fetch KPI metrics
export const fetchKpiData = async () => {
  try {
    return await apiCall('/kpi');
  } catch (e) {
    console.error('fetchKpiData failed:', e);
    return { totalAlerts: 0, criticalAlerts: 0, resolvedAlerts: 0, avgResponseTime: '0min' };
  }
};

// Fetch chart data
export const fetchChartData = async () => {
  try {
    const { data } = await apiCall('/chart-data');
    return data || [];
  } catch (e) {
    console.error('fetchChartData failed:', e);
    return [];
  }
};

// Generic query endpoint
export const queryData = async params => {
  return await apiCall('/query', {
    method: 'POST',
    body: JSON.stringify(params),
  });
};

// Detect anomalies (admin only)
export const fetchAnomalies = async () => {
  return await apiCall('/anomalies', { method: 'POST' });
};

// Correlate alerts
export const fetchCorrelatedAlerts = async () => {
  return await apiCall('/correlate', { method: 'POST' });
};

// Ingest raw logs (syslog or CSV)
export const ingestLogs = async (body, contentType = 'application/json') => {
  return await fetch(`${API_BASE_URL}/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body,
  }).then(res => {
    if (!res.ok) throw new Error(`Ingest failed: ${res.status}`);
    return res.json();
  });
};
