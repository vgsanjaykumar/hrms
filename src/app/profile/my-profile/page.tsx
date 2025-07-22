'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
  GiftOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
 
} from '@ant-design/icons';
import Cropper from 'react-easy-crop';
import { Modal, Slider } from 'antd';

interface Education {
  course: string;
  organization: string;
  startTime: string;
  endTime: string;
  score: string;
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
  // Removed unused user state
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    course: '',
    organization: '',
    startTime: '',
    endTime: '',
    score: '',
  });
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [address, setAddress] = useState(profile.location || '');
  const [newSkill, setNewSkill] = useState<string>('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
const [cropModalOpen, setCropModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState<File | null>(null);
const onCropComplete = (_: any, croppedAreaPixels: any) => {
  setCroppedAreaPixels(croppedAreaPixels);
};

const [sidebarOpen, setSidebarOpen] = useState(false);




  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        if (data) {
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
      })
      .catch(() => setLoading(false));
  }, []);

  function calculateProgress(data: any) {
    let total = 6;
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
    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setProfile((prev: Record<string, any>) => ({ ...prev, skills }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    if (profile.skills.includes(newSkill.trim())) return;
    const updatedSkills = [...profile.skills, newSkill.trim()];
    setProfile((prev: any) => ({ ...prev, skills: updatedSkills }));
    setNewSkill('');
    saveProfile();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = profile.skills.filter((skill: string) => skill !== skillToRemove);
    setProfile((prev: any) => ({ ...prev, skills: updatedSkills }));
    saveProfile();
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
    setProfile((prev: any) => ({
      ...prev,
      education: [...prev.education, currentEducation],
    }));
    setShowEditEducation(false);
    setCurrentEducation({
      course: '',
      organization: '',
      startTime: '',
      endTime: '',
    } as Education);
    saveProfile();
  };

  const saveProfile = async () => {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(profile),
    });
    const updated = await res.json();
    setProfile(updated);
  };

  if (loading) return <p>Loading...</p>;

  return (
    
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <div className="md:hidden purple-600 text-white flex justify-between items-center p-4">
               <img
                    src="/assets/Hashtag-Logo.png"
                    alt="Logo"
                    className=" mb-2 w-65 h-12"
                />
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
        <aside className={`fixed top-0 left-0 w-64 h-screen bg-purple-700 text-white flex flex-col p-6 space-y-6 md:flex transition-transform transform z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <h2 className="text-2xl font-bold hidden md:block"> Hazhtech HRMS</h2>
                <nav className="flex flex-col space-y-4 overflow-y-auto">
                    <a href="/profile/dashboard" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Dashboard</a>
                    <a href="#Projects" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Projects</a>
                    <a href="#PayRoll" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">PayRoll</a>
                    <a href="#Attendance" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">Attendance</a>
                    <a href="/profile/my-profile" className="hover:bg-white hover:text-purple-600 p-2 rounded transition">My Profile</a>
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

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[1px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
  
      {/* Main content */}
<main  className={`p-4 md:p-8 overflow-auto min-h-screen bg-white md:ml-64 transition-all duration-300 ${sidebarOpen ? 'blur-sm pointer-events-none select-none' : ''  }`}
>       


        {/* Sidebar header with title and hamburger for md and up */}
        <div className="hidden md:flex fixed top-0 left-0 w-64 h-16 bg-purple-700 text-white items-center px-6 space-x-4 z-50">
          <h1 className="text-3xl font-bold justify-right">HRMS</h1>
        </div>
        

        {/* Profile Header */}
<div
  className={`flex flex-col md:flex-row md:items-center justify-between gap-6 flex-wrap mb-8 mt-5 md:mt-10 w-full ${sidebarOpen ? 'bg-white bg-opacity-50 backdrop-blur-lg rounded-md p-4 transition-colors duration-300' : ''  }`}
>          <div className="md:items-center relative w-32 h-32 rounded-full border-4 border-purple-700 overflow-hidden cursor-pointer">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full text-gray-600 text-6xl">
                <UserOutlined className="h-16 w-16" />
              </div>
              )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profilePhotoInput"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfile((prev: any) => ({ ...prev, photoUrl: reader.result as string }));
                  saveProfile();
                };
                reader.readAsDataURL(file);
              }}
            />
            <label
              htmlFor="profilePhotoInput"
              className="absolute bottom-0 right-0 text-white bg-purple-600 rounded-full p-1 cursor-pointer hover:bg-gray-100 hover:text-purple-600  shadow-lg"
              style={{ width: '36px', height: '36px', transform: 'translate(-10%, -15%)' }}
              title="Add profile photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            {profile.photoUrl && (
              <button
                onClick={() => {
                  setProfile((prev: any) => ({ ...prev, photoUrl: '' }));
                  saveProfile();
                }}
                className="absolute -top-3 -right-3 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 shadow-lg"
                title="Remove profile photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div>
            {editingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  name="name"
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
                  
                  <EditOutlined className='soft-glow-hover' />
                </button>
              </h2>
            )}
            {(() => {
              if (profile.education.length === 0) {
                return (
                  <>
                    <p className="text-black font-semibold">Degree</p>
                    <p className="text-black">Institution</p>
                  </>
                );
              }
              const sortedEducation = profile.education.slice().sort((a: Education, b: Education) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
              const latestEdu = sortedEducation[0];
              return (
                <>
                  <p className="text-black font-semibold">{latestEdu.course}</p>
                  <p className="text-black">{latestEdu.organization}</p>
                </>
              );
            })()}
          </div>
        </div>

        {/* Contact Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 text-gray-700">
            <div className="flex items-center space-x-4">
              <EnvironmentOutlined className="text-gray-400 w-6 h-6" />
              <span>{profile.location || 'Address'}</span>
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
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setCurrentEducation({
                    course: '',
                    organization: '',
                    startTime: '',
                    endTime: '',
                    score: '',
                  });
                  setShowEditEducation(true);
                  setEditMode(false);
                  setEditingIndex(null);
                }}
                className="text-purple-600 font-semibold hover:underline"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setEditMode(!editMode);
                  setShowEditEducation(false);
                  setEditingIndex(null);
                }}
                className={`text-purple-600 font-semibold hover:underline ${editMode ? 'underline' : ''}`}
              >
                Edit
              </button>
            </div>
          </div>
          {profile.education.length === 0 && <p>No education records found.</p>}
          <ul>
          {profile.education
            .slice()
            .sort((a: Education, b: Education) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
            .map((edu: Education, idx: number) => {
              const start = new Date(edu.startTime);
              const end = new Date(edu.endTime);
              const formatDate = (date: Date) => date.toLocaleString('default', { month: 'short', year: 'numeric' });
              return (
                <li key={idx} className="mb-4 border-b border-gray-200 pb-2 relative">
                  <p className="font-semibold">{edu.course}</p>
                  <p className="text-gray-600">{edu.organization}</p>
                  <p className="text-black text-sm">
                    {formatDate(start)} - {formatDate(end)} ({edu.score}%)
                  </p>
                  {editMode && (
                    <div className="absolute top-0 right-0 flex space-x-2 p-1">
                      <button
                        aria-label="Edit education"
                        onClick={() => {
                          setCurrentEducation(edu);
                          setShowEditEducation(true);
                          setEditingIndex(idx);
                        }}
                        className="text-purple-600 hover:text-blue-800"
                      >
                        <EditOutlined className="h-4 w-4" />
                        
                      </button>
                      <button
                        aria-label="Delete education"
                        onClick={() => {
                          setProfile((prev: any) => {
                            const newEducation = [...prev.education];
                            newEducation.splice(idx, 1);
                            return { ...prev, education: newEducation };
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {showEditEducation && (
            <div className="mt-4 p-4 border border-gray-300 rounded space-y-4">
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={currentEducation.course || ''}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={currentEducation.organization || ''}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="month"
                name="startTime"
                placeholder="Start Time"
                value={currentEducation.startTime || ''}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="month"
                name="endTime"
                placeholder="End Time"
                value={currentEducation.endTime || ''}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
              />
              <input
                type="text"
                name="score"
                placeholder="Score %"
                value={currentEducation.score || ''}
                onChange={handleEditEducationChange}
                className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (editingIndex !== null) {
                      setProfile((prev: any) => {
                        const newEducation = [...prev.education];
                        newEducation[editingIndex] = currentEducation;
                        return { ...prev, education: newEducation };
                      });
                    } else {
                      setProfile((prev: any) => ({
                        ...prev,
                        education: [...prev.education, currentEducation],
                      }));
                    }
                    setShowEditEducation(false);
                    setEditMode(false);
                    setEditingIndex(null);
                    setCurrentEducation({
                      course: '',
                      organization: '',
                      startTime: '',
                      endTime: '',
                      score: '',
                    });
                    saveProfile();
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Save Education
                </button>
                <button
                  onClick={() => {
                    setShowEditEducation(false);
                    setEditMode(false);
                    setEditingIndex(null);
                    setCurrentEducation({
                      course: '',
                      organization: '',
                      startTime: '',
                      endTime: '',
                      score: '',
                    });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="text-black bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.length === 0 && <p>No skills added.</p>}
            {profile.skills.map((skill: string, idx: number) => (
              <div
                key={idx}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-2 py-1"
            />
            <button
              onClick={handleAddSkill}
              className="text-purple-600 font-semibold hover:underline"
            >
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
