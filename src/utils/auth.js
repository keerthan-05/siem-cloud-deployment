// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://o4dhl0x6p6.execute-api.ap-south-1.amazonaws.com/dev';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function for API calls
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

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Authentication
export const loginUser = async (credentials) => {
  try {
    const response = await apiCall('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Fetch alerts
export const fetchAlerts = async () => {
  try {
    const response = await apiCall('/alerts');
    return response.alerts || response || [];
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    // Return mock data for development
    return [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        severity: 'high',
        source: 'Firewall',
        message: 'Suspicious login attempt detected',
        status: 'Open'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        severity: 'medium',
        source: 'IDS',
        message: 'Unusual network traffic pattern',
        status: 'Investigating'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        severity: 'low',
        source: 'Antivirus',
        message: 'Quarantined potentially harmful file',
        status: 'Resolved'
      }
    ];
  }
};

// Fetch KPI data
export const fetchKpiData = async () => {
  try {
    const response = await apiCall('/kpi');
    return response;
  } catch (error) {
    console.error('Failed to fetch KPI data:', error);
    // Return mock data for development
    return {
      totalAlerts: 127,
      criticalAlerts: 8,
      resolvedAlerts: 95,
      avgResponseTime: '12min'
    };
  }
};

// Fetch chart data
export const fetchChartData = async () => {
  try {
    const response = await apiCall('/chart-data');
    return response.data || response || [];
  } catch (error) {
    console.error('Failed to fetch chart data:', error);
    // Return mock data for development
    const hours = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date(Date.now() - i * 3600000);
      hours.push({
        time: time.getHours().toString().padStart(2, '0') + ':00',
        alerts: Math.floor(Math.random() * 20) + 1,
        resolved: Math.floor(Math.random() * 15) + 1
      });
    }
    return hours;
  }
};

// Mock data generator for development
export const useMockData = () => {
  return {
    alerts: [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        severity: 'high',
        source: 'Firewall',
        message: 'Multiple failed login attempts from IP 192.168.1.100',
        status: 'Open'
      },
      // Add more mock alerts as needed
    ]
  };
};
