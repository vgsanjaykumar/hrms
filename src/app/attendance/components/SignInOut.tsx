import React from 'react';
import { ClockIcon, UserPlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default function SignInOut() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <ClockIcon className="h-10 w-10 text-purple-500" />
        <p className="mt-2 font-bold">9:30 AM</p>
        <span className="text-sm text-gray-500">Clock In</span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <ClockIcon className="h-10 w-10 text-red-500" />
        <p className="mt-2 font-bold">6:00 PM</p>
        <span className="text-sm text-gray-500">Clock Out</span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <UserPlusIcon className="h-10 w-10 text-green-500" />
        <p className="mt-2 font-bold">Apply Leave</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <ClipboardDocumentListIcon className="h-10 w-10 text-blue-500" />
        <p className="mt-2 font-bold">Add Timesheet</p>
      </div>
    </div>
  );
}
