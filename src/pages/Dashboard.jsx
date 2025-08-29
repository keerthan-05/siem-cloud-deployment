import React, { useState, useEffect } from "react";
import EventsTable from "../components/EventsTable";
import EventsBarChart from "../components/EventsBarChart";
import EventsLineChart from "../components/EventsLineChart";
import EventSourcesTable from "../components/EventSourcesTable";
import KpiCard from "../components/KpiCard";
import ExportCsvButton from "../components/ExportCsvButton";
import { fetchAlerts, fetchKpiData, fetchChartData } from "../utils/auth";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Timer,
  RefreshCcw,
} from "lucide-react";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [kpiData, setKpiData] = useState({
    totalAlerts: 0,
    criticalAlerts: 0,
    resolvedAlerts: 0,
    avgResponseTime: "0min",
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

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
        fetchChartData(),
      ]);
      setAlerts(alertsData);
      setKpiData(kpiResponse);
      setChartData(chartResponse);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesText =
      alert.message.toLowerCase().includes(filter.toLowerCase()) ||
      alert.source.toLowerCase().includes(filter.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || alert.severity.toLowerCase() === severityFilter;
    return matchesText && matchesSeverity;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          SIEM Dashboard
        </h1>
        <div className="flex gap-3">
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          <ExportCsvButton data={filteredAlerts} filename="siem-alerts" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Total Alerts" value={kpiData.totalAlerts} icon={<Bell />} color="blue" />
        <KpiCard title="Critical Alerts" value={kpiData.criticalAlerts} icon={<AlertTriangle />} color="red" />
        <KpiCard title="Resolved Alerts" value={kpiData.resolvedAlerts} icon={<CheckCircle2 />} color="green" />
        <KpiCard title="Avg Response Time" value={kpiData.avgResponseTime} icon={<Timer />} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventsBarChart data={chartData} />
        <EventsLineChart data={chartData} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search alerts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
        />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
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
