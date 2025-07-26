'use client';
import React, { ChangeEvent } from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

interface ProfileHeaderProps {
  profile: any;
  editingName: boolean;
  setEditingName: (value: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameSave: () => void;
}

export default function ProfileHeader({
  profile,
  editingName,
  setEditingName,
  handleChange,
  handleNameSave,
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-6 flex-wrap mb-8 mt-5 md:mt-10 w-full`}
    >
      <div className="md:items-center relative w-32 h-32 rounded-full border-4 border-purple-700 overflow-hidden cursor-pointer">
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
        {/* Photo upload input and label can be added here if needed */}
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
              <EditOutlined className="soft-glow-hover" />
            </button>
          </h2>
        )}
      </div>
    </div>
  );
}
