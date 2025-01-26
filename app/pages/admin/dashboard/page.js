"use client";
import React, { useEffect } from "react";
import withAuth from "@/component/HOC/withAuth";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import useDashboardHook from "@/hooks/useDashboardHook";
import PageHeading from "@/component/core/PageHeading";

const AdminDashboard = () => {
  useEffect(() => {
    fetchStats();
  }, []);

  const { fetchStats, pieData, barData, handleNavigation, statsCards } =
    useDashboardHook();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeading
        heading="Admin Dashboard"
        subHeading="Overview of system statistics and metrics"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md transform transition-all 
                       hover:scale-105 hover:shadow-xl cursor-pointer group"
            onClick={() => handleNavigation(card.route)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium mb-2">
                  {card.title}
                </h2>
                <p className="text-2xl font-bold" style={{ color: card.color }}>
                  {card.value}
                </p>
              </div>
              <div
                className={`text-3xl opacity-50 group-hover:opacity-100 transition-opacity`}
                style={{ color: card.color }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            User Distribution
          </h3>
          <div className="w-full h-80 mx-auto">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Events and Feedback Overview
          </h3>
          <div className="h-80">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Metrics",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Count",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard);
