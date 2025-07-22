'use client';
import React from 'react';

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
  return (
    <>
      {!isProfileEditing ? (
        <div className="bg-white text-purple-600 p-4 rounded shadow space-y-4">
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
        </div>
      ) : null}
    </>
  );
}
