'use client';
import React, { useState, useEffect } from 'react';

interface ProfileDetailsProps {
  education10th: string;
  education12th: string;
  college: string;
  skills: string[];
  location: string;
  isProfileEditing: boolean;
  setIsProfileEditing: (value: boolean) => void;
}

export default function ProfileDetails({
  education10th,
  education12th,
  college,
  skills,
  location,
  isProfileEditing,
  setIsProfileEditing,
}: ProfileDetailsProps) {
  const [edit10th, setEdit10th] = useState(education10th);
  const [edit12th, setEdit12th] = useState(education12th);
  const [editCollege, setEditCollege] = useState(college);
  const [editSkills, setEditSkills] = useState(skills.join(', '));
  const [editLocation, setEditLocation] = useState(location);

  useEffect(() => {
    setEdit10th(education10th);
    setEdit12th(education12th);
    setEditCollege(college);
    setEditSkills(skills.join(', '));
    setEditLocation(location);
  }, [education10th, education12th, college, skills, location]);

  const handleSave = async () => {
    const updatedProfile = {
      education10th: edit10th,
      education12th: edit12th,
      college: editCollege,
      skills: editSkills.split(',').map((skill) => skill.trim()),
      location: editLocation,
    };

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) {
        console.error('Failed to update profile');
        return;
      }

      setIsProfileEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="bg-white text-purple-600 p-4 rounded shadow space-y-4">
      {!isProfileEditing ? (
        <>
          <div>
            <h3 className="font-semibold">Education</h3>
            <p>10th: {education10th || 'Not provided'}</p>
            <p>12th: {education12th || 'Not provided'}</p>
            <p>College: {college || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Skills</h3>
            <ul className="list-disc list-inside">
              {skills.length > 0 ? (
                skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <li>Not provided</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{location || 'Not provided'}</p>
          </div>
          <button
            onClick={() => setIsProfileEditing(true)}
            className="text-purple-600 hover:text-purple-800 font-semibold"
          >
            Edit Details
          </button>
        </>
      ) : (
        <>
          <div>
            <h3 className="font-semibold">Education</h3>
            <input
              type="text"
              value={edit10th}
              onChange={(e) => setEdit10th(e.target.value)}
              placeholder="10th"
              className="border p-2 w-full rounded mt-1 mb-2"
            />
            <input
              type="text"
              value={edit12th}
              onChange={(e) => setEdit12th(e.target.value)}
              placeholder="12th"
              className="border p-2 w-full rounded mt-1 mb-2"
            />
            <input
              type="text"
              value={editCollege}
              onChange={(e) => setEditCollege(e.target.value)}
              placeholder="College"
              className="border p-2 w-full rounded mt-1"
            />
          </div>
          <div>
            <h3 className="font-semibold">Skills (comma separated)</h3>
            <input
              type="text"
              value={editSkills}
              onChange={(e) => setEditSkills(e.target.value)}
              placeholder="React, Node.js"
              className="border p-2 w-full rounded mt-1"
            />
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              placeholder="Karaikudi"
              className="border p-2 w-full rounded mt-1"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsProfileEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}