'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { EnvironmentOutlined, PhoneOutlined, ManOutlined, WomanOutlined, GiftOutlined, MailOutlined } from '@ant-design/icons';
import AlgoliaPlacesInput from './AlgoliaPlacesInput';


interface Education {
  course: string;
  organization: string;
  graduationYear: string;
  fullTime: boolean;
}

export default function MyProfilePage() {
  const [profile, setProfile] = useState<any>({
    name: '',
    email: '',
    dob: '', 
    
    gender: '',
    location: '',
    phone: '',
    skills: [] as string[],
    education: [] as Education[],
    progress: 0,
    photoUrl: '',
  });
  const userEmail = 'sundhareshan8506@gmail.com'; // from auth
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    course: '',
    organization: '',
    graduationYear: '',
    fullTime: true,
  });
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [address, setAddress] = useState(profile.location || '');
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  // Removed Google Maps script loading useEffect and googleScriptLoaded state


  useEffect(() => {
    fetch(`/api/profile/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          // Merge signup info fields if missing in profile data
          const mergedData = {
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            gender: data.gender || '',
            dob: data.dob || '',
            location: data.location || '',
            skills: data.skills || [],
            education: data.education || [],
            photoUrl: data.image || 'https://via.placeholder.com/150',
            progress: calculateProgress(data),
          };
          setProfile(mergedData);
          setAddress(mergedData.location);
        }
        setLoading(false);
      });
  }, []);

  function calculateProgress(data: any) {
    let total = 6; // number of fields considered
    let filled = 0;
    if (data.name) filled++;
    if (data.email) filled++;
    if (data.dob) filled++;
    if (data.gender) filled++;
    if (data.location) filled++;
    if (data.phone) filled++;
    return Math.round((filled / total) * 100);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev: Record<string, any>) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(s => s.trim());
    setProfile((prev: Record<string, any>) => ({ ...prev, skills }));
  };

  const handleNameSave = () => {
    setEditingName(false);
    saveProfile();
  };

  const handleEditEducationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveEducation = () => {
    setProfile((prev: any) => {
      const updatedEducation = [...prev.education];
      if (updatedEducation.length > 0) {
        updatedEducation[0] = currentEducation;
      } else {
        updatedEducation.push(currentEducation);
      }
      return {
        ...prev,
        education: updatedEducation,
      };
    });
    setShowEditEducation(false);
    setIsEditingEducation(false);
    saveProfile();
  };

  const saveProfile = async () => {
    const res = await fetch(`/api/profile/${userEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const updated = await res.json();
    setProfile(updated);
  };

  const handleSelect = async (value: string) => {
    setAddress(value);
    setProfile((prev: any) => ({
      ...prev,
      location: value,
    }));
    saveProfile();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-purple-700 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-8">HRMS</h1>
        <nav className="flex flex-col space-y-4">
          <a href="/profile/dashboard" className="hover:bg-purple-600 p-2 rounded">Dashboard</a>
          <a href="#projects" className="hover:bg-purple-600 p-2 rounded">Projects</a>
          <a href="#payroll" className="hover:bg-purple-600 p-2 rounded">PayRoll</a>
          <a href="#attendance" className="hover:bg-purple-600 p-2 rounded">Attendance</a>
          <a href="/profile/my-profile" className="bg-white text-purple-700 p-2 rounded font-semibold">My Profile</a>
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

      {/* Main content */}
      <main className="ml-64 p-8 overflow-auto min-h-screen bg-white">
        {/* Profile Header */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="relative">
            <img
              src={profile.photoUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-500"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 font-semibold text-sm">
              {profile.progress}%
            </div>
          </div>
          <div>
            {editingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile((prev: Record<string, any>) => ({ ...prev, name: e.target.value }))}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <button
                  onClick={handleNameSave}
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2 className="text-black text-3xl font-bold flex items-center space-x-2">
                <span>{profile.name || 'Your Name'}</span>
                <button
                  onClick={() => setEditingName(true)}
                  aria-label="Edit name"
                  className="text-black"
                >
                  ✏️
                </button>
              </h2>
            )}
            <p className="text-black font-semibold">{profile.education[0]?.course || 'Degree'}</p>
            <p className="text-black">{profile.education[0]?.organization || 'Institution'}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-gray-700">
          <div className="flex items-center space-x-4">
            <EnvironmentOutlined className="text-gray-400 w-6 h-6" />
          <AlgoliaPlacesInput
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          />
          </div>
          <div className="flex items-center space-x-4">
            <PhoneOutlined className="text-gray-400 w-6 h-6" />
            <span>{profile.phone || 'Phone'}</span>
          </div>
          <div className="flex items-center space-x-4">
            {(profile.gender === 'male' || profile.gender === 'Male') ? (
              <ManOutlined className="text-gray-400 w-6 h-6" />
            ) : (
              <WomanOutlined className="text-gray-400 w-6 h-6" />
            )}
            <span>{profile.gender || 'Gender'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <GiftOutlined className="text-gray-400 w-6 h-6" />
            <span>{profile.dob || 'DOB'}</span>
          </div>
          <div className="flex items-center space-x-4 col-span-2">
            <MailOutlined className="text-black w-6 h-6" />
            <span>{profile.email || 'Email'}</span>
          </div>
        </div>

        {/* Education Section */}
        <div className="text-black bg-white p-6 rounded shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Education</h3>
            <button
              onClick={() => {
                if (profile.education.length > 0) {
                  setCurrentEducation(profile.education[0]);
                  setIsEditingEducation(true);
                  setShowEditEducation(true);
                }
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          {profile.education.length === 0 && <p>No education records found.</p>}
          <ul>
            {profile.education.map((edu: Education, idx: number) => (
              <li key={idx} className="mb-4 border-b border-gray-200 pb-2">
                <p className="font-semibold">{edu.course}</p>
                <p className="text-gray-600">{edu.organization}</p>
                <p className="text-black text-sm">
                  Graduating in {edu.graduationYear}, {edu.fullTime ? 'Full Time' : 'Part Time'}
                </p>
              </li>
            ))}
          </ul>
          {showEditEducation && (
            <div className="mt-4 p-4 border border-gray-300 rounded space-y-4">
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={currentEducation.course}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={currentEducation.organization}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                name="graduationYear"
                placeholder="Graduation Year"
                value={currentEducation.graduationYear}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="fullTime"
                  checked={currentEducation.fullTime}
                  onChange={handleEditEducationChange}
                />
                <span>Full Time</span>
              </label>
              <button
                onClick={saveEducation}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save Education
              </button>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="text-black bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.length === 0 && <p>No skills added.</p>}
            {profile.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200"
              >
                {skill}
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add skills separated by commas"
            onChange={handleSkillsChange}
            className="mt-4 w-full border border-gray-300 rounded px-2 py-1"
            value={profile.skills.join(', ')}
          />
        </div>
      </main>
    </div>
  );
}
