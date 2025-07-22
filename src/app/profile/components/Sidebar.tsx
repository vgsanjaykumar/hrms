'use client';
import React from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      <div className="md:hidden purple-600 text-white flex justify-between items-center p-4">
        <img src="/assets/Hashtag-Logo.png" alt="Logo" className="mb-2 w-65 h-12" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="p-2 rounded bg-purple-700 z-50"
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-purple-700 text-white flex flex-col p-6 space-y-6 md:flex transition-transform transform z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className="text-2xl font-bold hidden md:block">HRMS</h2>
        <nav className="flex flex-col space-y-4 overflow-y-auto">
          <a href="/profile/dashboard" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">
            Dashboard
          </a>
          <a href="#Projects" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">
            Projects
          </a>
          <a href="#PayRoll" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">
            PayRoll
          </a>
          <a href="#Attendance" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">
            Attendance
          </a>
          <a href="/profile/my-profile" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">
            My Profile
          </a>
        </nav>
        <button
          onClick={async () => {
            await fetch('/api/logout', { credentials: 'include' });
            window.location.href = '/login';
          }}
          className="mt-auto bg-white text-purple-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[1px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
