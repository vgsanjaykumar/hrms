'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/profile/components/Sidebar';
import UserInfoCard from '../components/UserInfoCard';

import ProfileDetails from '@/components/profile/ProfileDetails';
import DashboardStats from '@/components/profile/DashboardStats';




export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    employees: 0,
    leaveRequests: 0,
    notifications: 0,
  });

  // Profile details state
  const [education10th, setEducation10th] = useState('');
  const [education12th, setEducation12th] = useState('');
  const [college, setCollege] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // User info for UserInfoCard
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // TODO: Fetch real dashboard stats from API
    // For now, use placeholder data
    setStats({
      employees: 256,
      leaveRequests: 5,
      notifications: 10,
    });
  }, []);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) {
          console.error('Failed to fetch user profile');
          return;
        }
        const users = await res.json();
        // Assuming current user is identified by email from AuthContext or similar
        // For now, pick the first user as placeholder
        const currentUser = users[0];

        if (currentUser) {
          // Extract education entries
          const education = currentUser.education || [];
          // Find 10th, 12th, college by course or organization name heuristics
          const edu10th = education.find((e: any) =>
            e.course?.toLowerCase().includes('10th') || e.organization?.toLowerCase().includes('10th')
          );
          const edu12th = education.find((e: any) =>
            e.course?.toLowerCase().includes('12th') || e.organization?.toLowerCase().includes('12th')
          );
          const collegeEdu = education.find((e: any) =>
            !e.course?.toLowerCase().includes('10th') && !e.course?.toLowerCase().includes('12th')
          );

          setEducation10th(edu10th ? edu10th.course || edu10th.organization || '' : '');
          setEducation12th(edu12th ? edu12th.course || edu12th.organization || '' : '');
          setCollege(collegeEdu ? collegeEdu.course || collegeEdu.organization || '' : '');

          setSkills(currentUser.skills || []);
          setLocation(currentUser.location || '');

          setName(currentUser.name || '');
          setEmail(currentUser.email || '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 p-6 sm:p-10 transition-all duration-300 ${
          sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <UserInfoCard name={name} email={email} />
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Dashboard</h1>

        <DashboardStats
          employees={stats.employees}
          leaveRequests={stats.leaveRequests}
          notifications={stats.notifications}
        />

        <ProfileDetails
          education10th={education10th}
          education12th={education12th}
          college={college}
          skills={skills}
          location={location}
          isProfileEditing={isProfileEditing}
          setIsProfileEditing={setIsProfileEditing}
        />
      </main>
    </div>
  )
}

