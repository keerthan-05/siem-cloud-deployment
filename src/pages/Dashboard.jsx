import React, { useState, useEffect } from 'react';
import EventsTable from '../components/EventsTable';
import EventsBarChart from '../components/EventsBarChart';
import EventsLineChart from '../components/EventsLineChart';
import EventSourcesTable from '../components/EventSourcesTable';
import KpiCard from '../components/KpiCard';
import Sparkline from '../components/Sparkline';
import ExportCsvButton from '../components/ExportCsvButton';
import { fetchAlerts, fetchKpiData, fetchChartData } from '../utils/auth';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [kpiData, setKpiData] = useState({
    totalAlerts: 0,
    criticalAlerts: 0,
    resolvedAlerts: 0,
    avgResponseTime: '0min'
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [alertsData, kpiResponse, chartResponse] = await Promise.all([
        fetchAlerts(),
        fetchKpiData(),
        fetchChartData()
      ]);
      setAlerts(alertsData);
      setKpiData(kpiResponse);
      setChartData(chartResponse);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesText =
      alert.message.toLowerCase().includes(filter.toLowerCase()) ||
      alert.source.toLowerCase().includes(filter.toLowerCase());
    const matchesSeverity =
      severityFilter === 'all' || alert.severity === severityFilter;
    return matchesText && matchesSeverity;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-primary">SIEM Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Refresh
          </button>
          <ExportCsvButton
            data={filteredAlerts}
            filename="siem-alerts"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          title="Total Alerts"
          value={kpiData.totalAlerts}
          icon="🔔"
          color="blue"
        />
        <KpiCard
          title="Critical Alerts"
          value={kpiData.criticalAlerts}
          icon="⚠️"
          color="red"
        />
        <KpiCard
          title="Resolved Alerts"
          value={kpiData.resolvedAlerts}
          icon="✅"
          color="green"
        />
        <KpiCard
          title="Avg Response Time"
          value={kpiData.avgResponseTime}
          icon="⏱️"
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventsBarChart data={chartData} />
        <EventsLineChart data={chartData} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search alerts..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <select
          value={severityFilter}
          onChange={e => setSeverityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          <option value="all">All Severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EventsTable alerts={filteredAlerts} />
        </div>
        <div>
          <EventSourcesTable alerts={filteredAlerts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
