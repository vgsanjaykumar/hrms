'use client';
import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-purple-600">{value}</p>
    </div>
  );
}

interface DashboardStatsProps {
  employees: number;
  leaveRequests: number;
  notifications: number;
}

export default function DashboardStats({ employees, leaveRequests, notifications }: DashboardStatsProps) {
  return (
    <section id="dashboard" className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Employees" value={employees} />
        <StatCard label="Leave Requests" value={leaveRequests} />
        <StatCard label="Notifications" value={notifications} />
      </div>
    </section>
  );
}
