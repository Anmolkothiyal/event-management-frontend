"use client";

import React, { useEffect } from "react";
import withAuth from "@/component/HOC/withAuth";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import PageRoutes from "@/utilis/PageRoute";
import useDashboardHook from "@/hooks/useDashboardHook";
import { useSelector } from "react-redux";
import PageHeading from "@/component/core/PageHeading";

const AdminDashboard = () => {
  useEffect(() => {
    fetchStats();
  }, []);

  const { dashboard } = useSelector((state) => state.dashboardSlice);
  const { fetchStats, pieData, barData, handleNavigation } = useDashboardHook();

  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading 
        heading="Admin Dashboard"
        subHeading="Overview of system statistics and metrics"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <div
          className="bg-white p-4 shadow-md rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleNavigation(PageRoutes.USER())}
        >
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboard.totalUsers}</p>
        </div>
        <div
          className="bg-white p-4 shadow-md rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleNavigation(PageRoutes.EVENT())}
        >
          <h2 className="text-lg font-semibold mb-2">Total Events</h2>
          <p className="text-2xl font-bold text-green-600">{dashboard.totalEvents}</p>
        </div>
        <div
          className="bg-white p-4 shadow-md rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleNavigation(PageRoutes.FEEDBACK())}
        >
          <h2 className="text-lg font-semibold mb-2">Total Feedback</h2>
          <p className="text-2xl font-bold text-yellow-600">{dashboard.totalFeedback}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">User Distribution</h3>
          <div className="w-full max-w-xs mx-auto">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">Events and Feedback</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard);