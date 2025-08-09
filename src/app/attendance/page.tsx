'use client';
import React, { useState } from 'react';
import Sidebar from '@/app/profile/components/Sidebar';
import SignInOut from './components/SignInOut';
import LeaveRequests from './components/LeaveRequests';
import Timesheet from './components/Timesheet';
import HolidayCalendar from './components/HolidayCalendar';

export default function AttendancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="text-black bg-purple flex-1 p-6 sm:p-10 md:ml-64 transition-all duration-300 space-y-6">
        <img src="/assets/Hashtag-Logo.png" alt="Logo" className="mb-2 w-65 h-12" />
        {/* Sign In / Sign Out */}
        <SignInOut />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Leave Requests & Timesheet */}
          <div className="lg:col-span-3 space-y-8">
          
            <Timesheet />
            <LeaveRequests />
          </div>

          {/* Right Side: Calendar */}
          <div className="lg:col-span-1">
            <HolidayCalendar />
          </div>
        </div>
      </main>
    </div>
  );
}
